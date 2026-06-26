# Fetch unique plates: Wikimedia API (correct URLs) + BHL pageimage. MD5 dedupe.
$dir = $PSScriptRoot
$UA = "PersonalSiteAssetFetch/1.2 (design-demos; local dev)"

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
  Start-Sleep -Seconds 5
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
  $title = "File:" + $fileName
  $enc = [uri]::EscapeDataString($title)
  $api = "https://commons.wikimedia.org/w/api.php?action=query&titles=$enc&prop=imageinfo&iiprop=url&format=json"
  try {
    $r = Invoke-RestMethod -Uri $api -Headers @{ "User-Agent" = $UA } -TimeoutSec 60
    $page = $r.query.pages.PSObject.Properties | Select-Object -First 1 | ForEach-Object { $_.Value }
    if ($page.missing) { return $null }
    return $page.imageinfo[0].url
  } catch { return $null }
}

$known = Get-KnownHashes
$ok = 0; $skip = 0; $fail = 0

$commonsFiles = @(
  @{ out = "botanical_redoute_rose_pontiana.jpg"; file = "Redoute_-_Rosa_gallica_pontiana.jpg"; src = "Wikimedia API · Redouté" },
  @{ out = "botanical_merian_surinam_plate12.jpg"; file = "Maria_Sibylla_Merian_-_Metamorphosis_insectorum_Surinamensium_-_Plate_12.jpg"; src = "Wikimedia API · Merian" },
  @{ out = "natural_history_gould_beagle_finch.jpg"; file = "Gould_-_Fringilla_sp_(The_Zoology_of_the_Voyage_of_H.M.S._Beagle).jpg"; src = "Wikimedia API · Gould" },
  @{ out = "botanical_curtis_magazine_plate452.jpg"; file = "Curtis's_Botanical_Magazine,_Plate_452_(Edwards,_1800).jpg"; src = "Wikimedia API · Curtis 452" },
  @{ out = "Pieris_butterfly_plate_Pieris_wollastoni-PD.png"; file = "Pieris_wollastoni-PD.png"; src = "Wikimedia API · Pieris PNG" },
  @{ out = "engraving_audubon_carolina_parrot.jpg"; file = "John_James_Audubon_-_Carolina_Parrot_-_Google_Art_Project.jpg"; src = "Wikimedia API · Audubon" },
  @{ out = "botanical_paeonia_lactiflora.jpg"; file = "Illustration_Paeonia_lactiflora0.jpg"; src = "Wikimedia API · Paeonia" },
  @{ out = "engraving_haeckel_jellyfish_plate85.jpg"; file = "Ernst_Haeckel_-_Kunstformen_der_Natur_-_Plate_85.jpg"; src = "Wikimedia API · Haeckel" },
  @{ out = "butterfly_naturalis_melanitis_leda.jpg"; file = "Naturalis_Biodiversity_Center_-_RMNH.ART.467_-_Melanitis_leda_-_J-O-Westwood.jpg"; src = "Wikimedia API · Naturalis" },
  @{ out = "botanical_redoute_regalis.jpg"; file = "Redoute_-_Rosa_gallica_regalis.jpg"; src = "Wikimedia API · Redouté regalis" }
)

foreach ($c in $commonsFiles) {
  $url = Get-CommonsDirectUrl $c.file
  if (-not $url) { Write-Host "`n[$($c.src)] NO API URL for $($c.file)"; $fail++; continue }
  $r = Fetch-Url $c.out $url $c.src $known
  switch ($r) { 'ok' { $ok++ } 'skip' { $skip++ } default { $fail++ } }
}

$bhl = @(
  @{ out = "bhl_humphreys_british_moths_plate.jpg"; url = "https://www.biodiversitylibrary.org/pageimage/38123160"; src = "BHL · Humphreys Moths" },
  @{ out = "bhl_gould_bird_plate.jpg"; url = "https://www.biodiversitylibrary.org/pageimage/20969480"; src = "BHL · Gould Birds" },
  @{ out = "bhl_botanical_magazine_flower.jpg"; url = "https://www.biodiversitylibrary.org/pageimage/35857840"; src = "BHL · Bot Mag flower" },
  @{ out = "bhl_insect_plate_engraving.jpg"; url = "https://www.biodiversitylibrary.org/pageimage/32537680"; src = "BHL · Scudder plate alt" },
  @{ out = "bhl_moth_transformation_plate.jpg"; url = "https://www.biodiversitylibrary.org/pageimage/38123210"; src = "BHL · Moth transform" },
  @{ out = "bhl_shells_conchology_plate.jpg"; url = "https://www.biodiversitylibrary.org/pageimage/14245656"; src = "BHL · Shells" },
  @{ out = "bhl_ferns_botanical_plate.jpg"; url = "https://www.biodiversitylibrary.org/pageimage/12829320"; src = "BHL · Ferns" },
  @{ out = "bhl_bird_ornithology_plate.jpg"; url = "https://www.biodiversitylibrary.org/pageimage/20969520"; src = "BHL · Ornithology" }
)

foreach ($b in $bhl) {
  $r = Fetch-Url $b.out $b.url $b.src $known
  switch ($r) { 'ok' { $ok++ } 'skip' { $skip++ } default { $fail++ } }
}

Write-Host "`nDone: $ok new, $skip dup-skip, $fail fail"
