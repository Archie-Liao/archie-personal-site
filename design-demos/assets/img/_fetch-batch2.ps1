# Batch 2: ~10 new unique plates — Commons API + BHL + Met OA + Smithsonian OA
$dir = $PSScriptRoot
$UA = "PersonalSiteAssetFetch/2.0 (archie-personal-site design-demos; contact: local-dev)"

function Get-KnownHashes {
  $m = @{}
  Get-ChildItem $dir -File | Where-Object { $_.Extension -match '\.(jpg|jpeg|png)$' } | ForEach-Object {
    $m[(Get-FileHash $_.FullName -Algorithm MD5).Hash] = $_.Name
  }
  return $m
}

function Fetch-Url($outName, $url, $label, [hashtable]$known) {
  $dest = Join-Path $dir $outName
  Write-Host "`n[$label] -> $outName"
  Start-Sleep -Seconds 4
  curl.exe -fsSL -A $UA --connect-timeout 60 --max-time 180 -o $dest $url
  if (-not (Test-Path $dest)) { Write-Host "  FAIL (no file)"; return 'fail' }
  $len = (Get-Item $dest).Length
  if ($len -lt 15000) {
    Write-Host "  FAIL (too small: $len b)"
    Remove-Item $dest -Force
    return 'fail'
  }
  $hash = (Get-FileHash $dest -Algorithm MD5).Hash
  if ($known.ContainsKey($hash)) {
    Write-Host "  SKIP dup of $($known[$hash])"
    Remove-Item $dest -Force
    return 'skip'
  }
  $known[$hash] = $outName
  Write-Host "  OK $([math]::Round($len/1KB,1)) KB md5=$($hash.Substring(0,8))"
  return 'ok'
}

function Get-CommonsDirectUrl($fileName) {
  $enc = [uri]::EscapeDataString("File:" + $fileName)
  $api = "https://commons.wikimedia.org/w/api.php?action=query&titles=$enc&prop=imageinfo&iiprop=url&format=json"
  try {
    $r = Invoke-RestMethod -Uri $api -Headers @{ "User-Agent" = $UA } -TimeoutSec 60
    $page = $r.query.pages.PSObject.Properties | Select-Object -First 1 | ForEach-Object { $_.Value }
    if ($page.missing) { return $null }
    return $page.imageinfo[0].url
  } catch { return $null }
}

function Fetch-MetOA($outName, $objectId, $label, [hashtable]$known) {
  try {
    Start-Sleep -Seconds 3
    $obj = Invoke-RestMethod -Uri "https://collectionapi.metmuseum.org/public/collection/v1/objects/$objectId" -Headers @{ "User-Agent" = $UA } -TimeoutSec 60
    if (-not $obj.isPublicDomain) { Write-Host "`n[$label] NOT public domain"; return 'fail' }
    $url = $obj.primaryImage
    if (-not $url) { Write-Host "`n[$label] NO image"; return 'fail' }
    return Fetch-Url $outName $url $label $known
  } catch { Write-Host "`n[$label] API error: $_"; return 'fail' }
}

function Fetch-Smithsonian($outName, $query, $label, [hashtable]$known) {
  try {
    Start-Sleep -Seconds 3
    $enc = [uri]::EscapeDataString($query)
    $search = Invoke-RestMethod -Uri "https://api.si.edu/openaccess/api/v1/search?q=$enc&rows=5" -Headers @{ "User-Agent" = $UA } -TimeoutSec 60
    foreach ($row in $search.response.rows) {
      $id = $row.id
      $detail = Invoke-RestMethod -Uri "https://api.si.edu/openaccess/api/v1/item/$id" -Headers @{ "User-Agent" = $UA } -TimeoutSec 60
      $url = $detail.response.indexedStructured.onlineMedia.media[0].content
      if ($url) {
        $r = Fetch-Url $outName $url "$label ($id)" $known
        if ($r -eq 'ok') { return $r }
      }
    }
    Write-Host "`n[$label] NO suitable image"
    return 'fail'
  } catch { Write-Host "`n[$label] API error: $_"; return 'fail' }
}

$known = Get-KnownHashes
$ok = 0; $skip = 0; $fail = 0
function Tally($r) { switch ($r) { 'ok' { $script:ok++ } 'skip' { $script:skip++ } default { $script:fail++ } } }

# --- Wikimedia Commons (API) — items not yet in folder ---
$commons = @(
  @{ out = "botanical_merian_surinam_plate12.jpg"; file = "Maria_Sibylla_Merian_-_Metamorphosis_insectorum_Surinamensium_-_Plate_12.jpg"; src = "Commons · Merian Surinam" },
  @{ out = "natural_history_gould_beagle_finch.jpg"; file = "Gould_-_Fringilla_sp_(The_Zoology_of_the_Voyage_of_H.M.S._Beagle).jpg"; src = "Commons · Gould Beagle" },
  @{ out = "botanical_curtis_magazine_plate452.jpg"; file = "Curtis's_Botanical_Magazine,_Plate_452_(Edwards,_1800).jpg"; src = "Commons · Curtis 452" },
  @{ out = "engraving_audubon_carolina_parrot.jpg"; file = "John_James_Audubon_-_Carolina_Parrot_-_Google_Art_Project.jpg"; src = "Commons · Audubon Parrot" },
  @{ out = "botanical_paeonia_lactiflora.jpg"; file = "Illustration_Paeonia_lactiflora0.jpg"; src = "Commons · Paeonia" },
  @{ out = "engraving_haeckel_jellyfish_plate85.jpg"; file = "Ernst_Haeckel_-_Kunstformen_der_Natur_-_Plate_85.jpg"; src = "Commons · Haeckel" },
  @{ out = "butterfly_naturalis_melanitis_leda.jpg"; file = "Naturalis_Biodiversity_Center_-_RMNH.ART.467_-_Melanitis_leda_-_J-O-Westwood.jpg"; src = "Commons · Naturalis" },
  @{ out = "botanical_durer_large_turf.jpg"; file = "Albrecht_Dürer_-_The_Large_Piece_of_Turf_-_Google_Art_Project.jpg"; src = "Commons · Dürer Turf" }
)
foreach ($c in $commons) {
  if (Test-Path (Join-Path $dir $c.out)) { Write-Host "`n[$($c.src)] EXISTS skip"; $skip++; continue }
  $url = Get-CommonsDirectUrl $c.file
  if (-not $url) { Write-Host "`n[$($c.src)] NO API URL"; $fail++; continue }
  Tally (Fetch-Url $c.out $url $c.src $known)
}

# --- BHL pageimage (new page IDs) ---
$bhl = @(
  @{ out = "bhl_humphreys_british_moths_plate.jpg"; url = "https://www.biodiversitylibrary.org/pageimage/38123160"; src = "BHL · Humphreys plate" },
  @{ out = "bhl_scudder_butterfly_plate_alt.jpg"; url = "https://www.biodiversitylibrary.org/pageimage/32537720"; src = "BHL · Scudder alt" },
  @{ out = "bhl_botanical_curtis_flower_alt.jpg"; url = "https://www.biodiversitylibrary.org/pageimage/35857900"; src = "BHL · Curtis flower alt" },
  @{ out = "bhl_sea_shells_plate_alt.jpg"; url = "https://www.biodiversitylibrary.org/pageimage/14245700"; src = "BHL · Shells alt" }
)
foreach ($b in $bhl) {
  if (Test-Path (Join-Path $dir $b.out)) { Write-Host "`n[$($b.src)] EXISTS skip"; $skip++; continue }
  Tally (Fetch-Url $b.out $b.url $b.src $known)
}

# --- Met Museum Open Access (known PD object IDs: botanical / butterfly) ---
$met = @(
  @{ out = "met_oasc_butterfly_print.jpg"; id = 436965; src = "Met OA · Butterfly print" },
  @{ out = "met_oasc_botanical_watercolor.jpg"; id = 823997; src = "Met OA · Botanical" }
)
foreach ($m in $met) {
  if (Test-Path (Join-Path $dir $m.out)) { Write-Host "`n[$($m.src)] EXISTS skip"; $skip++; continue }
  Tally (Fetch-MetOA $m.out $m.id $m.src $known)
}

# --- Smithsonian Open Access ---
if (-not (Test-Path (Join-Path $dir "si_oasc_botanical_illustration.jpg"))) {
  Tally (Fetch-Smithsonian "si_oasc_botanical_illustration.jpg" "botanical illustration lithograph" "Smithsonian OA · Botanical")
} else { $skip++ }

Write-Host "`n=== Batch 2 done: $ok new, $skip skip, $fail fail ==="
