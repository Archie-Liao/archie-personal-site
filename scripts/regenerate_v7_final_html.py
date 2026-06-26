# -*- coding: utf-8 -*-
"""Generate compare-v7-final.html — last logo font round (UTF-8 safe)."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "design-demos" / "logo-fonts" / "compare-v7-final.html"

L = {
    "title": "Logo v7 \u00b7 \u6700\u7ec8\u4e09\u9009\u4e00",
    "zh": "\u5ed6\u667a\u5f3a",
    "back1": "\u2190 logo-fonts",
    "back2": "\u2190 v6 \u4e0a\u4e00\u8f6e",
    "h1": "Logo v7 \u00b7 \u6700\u7ec8\u4e09\u9009\u4e00",
    "intro1": "\u5bf9\u9f50\u4f60\u53d1\u7684\u300c\u82b1\u53d4\u300d\u53c2\u8003\uff1a",
    "intro1b": "\u9ad8\u5bf9\u6bd4\u5c16\u886c\u7ebf\u5b8b",
    "intro1c": "\uff0c\u4e0d\u53d6\u6697\u5e95\u8272\u7968\u3002\u5b57\u91cd\u6bd4\u53c2\u8003\u56fe",
    "intro1d": "\u7565\u8f7b\u4e00\u6863",
    "intro2": "\uff1b\u4e09\u6863",
    "intro2b": "\u6545\u610f\u62c9\u5f00\u5dee\u8ddd",
    "intro2c": "\uff0c\u4e0d\u518d\u5806\u66f4\u591a\u9009\u9879\u3002",
    "intro3": "\u76f4\u63a5\u56de ",
    "intro3b": " \u5373\u53ef\u3002",
    "open_h": "\u6253\u5f00\u65b9\u5f0f\uff1a",
    "open_b": "\u8bf7\u7528\u672c\u5730\u670d\u52a1\u5668\uff0c\u52ff file:// \u53cc\u51fb\u3002",
    "ref_cap": "\u4f60\u7684\u53c2\u8003 \u00b7 \u82b1\u53d4 lockup",
    "ref_txt": "\uff08\u8272\u7968\u5ffd\u7565\uff09\u5de6\u4e0a\u82b1\u53d4\u9ad8\u5bf9\u6bd4\u5b8b + \u53f3\u4e0b\u659c\u4f53\u82f1\u6587\u3002\u672c\u9875\u7528\u7ad9\u70b9\u5976\u6cb9\u7eb8\u8272\u9884\u89c8\u3002",
    "fs_h": "\u5b57\u4f53\u52a0\u8f7d\u68c0\u6d4b \u00b7 \u68c0\u6d4b\u4e2d\u2026",
    "fs_li": "\u9a8c\u8bc1\u672c\u5730 fonts/ \u2026",
    "sec_h": "Hero \u00b7 \u4e09\u680f\u7ec8\u9009\uff08\u5b57\u91cd\u8f83\u8f7b\uff09",
    "checking": "\u68c0\u6d4b\u4e2d\u2026",
    "nav_lbl": "\u9876\u680f nav",
    "how": "\u600e\u4e48\u9009\uff1a",
    "how1": "\u4e0d\u7528\u627e\u4e0d\u540c\u4e86\u2014\u2014\u770b\u54ea\u680f\u6700\u987a\u773c\u3002\u56de\u590d ",
    "how2": " \u6216\u300c\u90fd\u4e0d\u8981\u300d\u5373\u6536\u5de5\u3002",
    "diff_h": "\u4e09\u6863\u5dee\u5728\u54ea\uff1a",
    "diff_a": "A \u6e05\u6670\u6570\u5b57\u601d\u6e90\u5b8b\uff0c\u6700\u5e72\u51c0\u3001\u6700\u300c\u6742\u5fd7\u5185\u9875\u300d\u3002",
    "diff_b": "B \u94c5\u5370\u65b0\u81fb\u5b8b\uff0c\u7b14\u753b\u6709\u65e7\u7eb8\u9897\u7c92\uff0c\u6bd4 A \u590d\u53e4\u3002",
    "diff_c": "C \u5c4f\u663e\u6807\u9898\u5b8b\uff0c\u4e3a lockup \u4f18\u5316\u7684\u9510\u5229\u886c\u7ebf\uff0c\u6700\u300c\u520a\u5934\u6807\u9898\u300d\u3002",
    "lbl_a": "\u7ec8\u9009 A",
    "lbl_b": "\u7ec8\u9009 B",
    "lbl_c": "\u7ec8\u9009 C",
    "title_a": "Noto Serif SC 500",
    "title_b": "\u971e\u9e4c\u65b0\u81fb\u5b8b",
    "title_c": "\u601d\u6e90\u5c4f\u663e\u81fb\u5b8b",
    "ref_a": "\u8f7b\u91cf\u73b0\u4ee3\u5b8b \u00b7 \u6700\u5e72\u51c0",
    "ref_b": "\u94c5\u5370\u590d\u53e4\u5b8b \u00b7 \u6709\u9897\u7c92",
    "ref_c": "Display \u6807\u9898\u5b8b \u00b7 \u6700\u9510",
    "desc_a": "\u601d\u6e90\u5b8b 500 + \u6696\u58a8\u8272\u3002\u4e09\u6863\u91cc\u6700\u8f7b\u3001\u6700\u4e2d\u6027\uff0c\u914d Playfair \u6700\u7a33\u3002",
    "desc_b": "LXGW Neo ZhiSong \u00b7 \u6bd4 Noto \u591a\u4e00\u5c42\u8001\u94c5\u5370\u7ec6\u8282\uff0c\u7ed3\u6784\u66f4\u6709\u300c\u624b\u611f\u300d\u3002",
    "desc_c": "Source Han Serif CN for Display \u00b7 Adobe \u5c4f\u663e\u5b8b\uff0c\u7b14\u753b\u5bf9\u6bd4\u5f3a\u4f46\u672c\u9875\u7528\u539f\u5b57\u91cd\uff0c\u4e0d\u518d\u52a0\u9ed1\u3002",
    "badge_ok": "\u2713 \u5df2\u52a0\u8f7d",
    "badge_fail": "\u2717 \u672a\u52a0\u8f7d",
    "fs_ok": "\u5b57\u4f53\u52a0\u8f7d\u68c0\u6d4b \u00b7 \u5168\u90e8 OK",
    "fs_bad": "\u5b57\u4f53\u52a0\u8f7d\u68c0\u6d4b \u00b7 \u6709\u5b57\u4f53\u672a\u52a0\u8f7d",
    "file_hint": "\u8bf7\u7528",
    "file_hint2": " \u6253\u5f00\uff08\u975e file://\uff09",
}

def card(sample, badge_id, label, title, ref, desc):
    return f"""
    <article class="card sample-{sample}" data-sample="{sample}">
      <span class="load-badge" data-badge="{badge_id}">{L['checking']}</span>
      <div class="card-label">{label}</div>
      <div class="card-title">{title}</div>
      <div class="card-ref">{ref}</div>
      <p class="card-desc">{desc}</p>
      <div class="preview-hero">
        <h3 class="wordmark"><span class="zh">{L['zh']}</span><span class="en">Archie</span></h3>
      </div>
      <div class="preview-nav">
        <div class="preview-nav-label">{L['nav_lbl']}</div>
        <span class="nav-wordmark"><span class="zh">{L['zh']}</span><span class="en">Archie</span></span>
      </div>
    </article>"""

html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{L['title']}</title>
<link rel="stylesheet" href="fonts/lxgw-neo-zhi-song/result.css" />
<link rel="stylesheet" href="fonts/sypxzs/result.css" />
<style>
  @font-face {{
    font-family: 'Noto Serif SC';
    src: url('fonts/NotoSerifSC-500.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }}
  @font-face {{
    font-family: 'Playfair Display';
    src: url('fonts/PlayfairDisplay-600-italic.woff2') format('woff2');
    font-weight: 600;
    font-style: italic;
    font-display: swap;
  }}
  :root {{
    --paper: #F5F0E8; --paper-2: #EFE7D8; --ink: #191919;
    --ink-print: #4A4238; --ink-soft: #6E6557; --accent: #CC785C;
    --rule: rgba(25, 25, 25, 0.12);
    --serif-en: 'Playfair Display', Georgia, serif;
    --serif-sc: 'Noto Serif SC', 'Songti SC', SimSun, serif;
    --font-lxgw: 'LXGW Neo ZhiSong', var(--serif-sc);
    --font-display: 'Source Han Serif CN for Display', var(--serif-sc);
    --sans: system-ui, 'Segoe UI', 'Noto Sans SC', sans-serif;
  }}
  * {{ box-sizing: border-box; }}
  body {{ margin: 0; background: var(--paper); color: var(--ink); font-family: var(--sans); font-size: 15px; line-height: 1.65; padding: 36px 28px 64px; }}
  .back {{ display: inline-block; margin-bottom: 8px; font-size: 13px; color: var(--ink-soft); text-decoration: none; }}
  .back:hover {{ color: var(--accent); }}
  h1 {{ font-size: 26px; letter-spacing: 0.04em; margin: 0 0 10px; }}
  .intro, .need-info {{ max-width: 820px; color: var(--ink-soft); font-size: 14px; margin-bottom: 20px; }}
  .intro strong, .need-info strong {{ color: var(--ink); }}
  .need-info {{ padding: 14px 18px; background: #FFFDF8; border: 1px solid var(--rule); border-left: 3px solid var(--accent); margin-bottom: 28px; }}
  .ref-row {{ display: grid; grid-template-columns: 220px 1fr; align-items: start; max-width: 820px; margin-bottom: 28px; font-size: 13px; color: var(--ink-soft); }}
  @media (max-width: 640px) {{ .ref-row {{ grid-template-columns: 1fr; }} }}
  .ref-row img {{ width: 100%; border: 1px solid var(--rule); background: #FFFDF8; }}
  .ref-row figcaption {{ margin: 0; padding-left: 16px; line-height: 1.65; }}
  @media (max-width: 640px) {{ .ref-row figcaption {{ padding: 12px 0 0; }} }}
  .ref-row figcaption b {{ color: var(--ink); }}
  .font-status {{ max-width: 960px; margin-bottom: 28px; padding: 14px 16px; border: 1px solid var(--rule); background: #FFFDF8; font-size: 13px; }}
  .font-status.is-warn {{ border-color: rgba(180, 60, 40, 0.45); background: rgba(180, 60, 40, 0.08); }}
  .font-status.is-ok {{ border-color: rgba(60, 90, 74, 0.35); }}
  .font-status h3 {{ margin: 0 0 8px; font-size: 13px; font-weight: 600; }}
  .font-status ul {{ margin: 0; padding-left: 1.2em; color: var(--ink-soft); }}
  .font-status .ok {{ color: #3C5A4A; }}
  .font-status .fail {{ color: #B43C28; font-weight: 600; }}
  section {{ margin-bottom: 44px; }}
  section > h2 {{ font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); margin: 0 0 16px; }}
  .grid {{ display: grid; grid-template-columns: repeat(3, 1fr); max-width: 1080px; gap: 16px; margin-bottom: 16px; }}
  @media (max-width: 900px) {{ .grid {{ grid-template-columns: 1fr; }} }}
  .card {{ background: #FFFDF8; border: 1px solid var(--rule); padding: 18px 16px 16px; display: flex; flex-direction: column; }}
  .card-label {{ font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 4px; }}
  .card-title {{ font-weight: 600; font-size: 15px; letter-spacing: 0.04em; margin-bottom: 6px; }}
  .card-ref {{ font-size: 11px; color: var(--accent); margin-bottom: 8px; letter-spacing: 0.04em; }}
  .card-desc {{ font-size: 12px; color: var(--ink-soft); line-height: 1.55; margin-bottom: 16px; flex: 1; }}
  .load-badge {{ display: inline-block; margin-bottom: 8px; padding: 2px 7px; font-size: 10px; letter-spacing: 0.08em; border-radius: 3px; background: var(--paper-2); color: var(--ink-soft); }}
  .card.font-fail {{ outline: 2px dashed rgba(180, 60, 40, 0.55); outline-offset: -2px; }}
  .card.font-fail .load-badge {{ background: rgba(180, 60, 40, 0.12); color: #B43C28; }}
  .preview-hero {{ padding-top: 10px; border-top: 1px solid var(--rule); min-height: 120px; }}
  .wordmark {{ margin: 0; }}
  .wordmark .zh {{ display: block; font-size: 44px; line-height: 1; letter-spacing: 0.04em; font-weight: normal !important; font-synthesis: none; }}
  .wordmark .en {{ display: block; font-family: var(--serif-en); font-style: italic; font-weight: 600; font-size: 34px; line-height: 1.05; letter-spacing: 0.005em; margin-top: 8px; margin-left: 2px; color: var(--ink); }}
  .preview-nav {{ margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--rule); }}
  .preview-nav-label {{ font-size: 10px; letter-spacing: 0.12em; color: var(--ink-soft); margin-bottom: 6px; }}
  .nav-wordmark {{ display: inline-flex; align-items: baseline; }}
  .nav-wordmark .zh {{ font-size: 1.05rem; font-weight: normal !important; font-synthesis: none; }}
  .nav-wordmark .en {{ font-family: var(--serif-en); font-style: italic; font-weight: 600; font-size: 0.82rem; color: var(--ink-soft); }}
  .nav-wordmark .en::before {{ content: '\\00b7'; margin: 0 8px; font-style: normal; opacity: 0.55; }}
  .sample-a .zh {{ font-family: var(--serif-sc); font-weight: 500; color: var(--ink-print); letter-spacing: 0.06em; }}
  .sample-b .zh {{ font-family: var(--font-lxgw); font-weight: 400; color: var(--ink-print); letter-spacing: 0.04em; }}
  .sample-c .zh {{ font-family: var(--font-display); font-weight: 400; color: var(--ink-print); letter-spacing: 0.05em; }}
  .pairing-note {{ max-width: 820px; font-size: 13px; color: var(--ink-soft); margin-top: 24px; padding: 12px 16px; background: rgba(60, 90, 74, 0.06); border: 1px solid rgba(60, 90, 74, 0.15); }}
  .diff-note {{ max-width: 820px; font-size: 13px; color: var(--ink-soft); margin-top: 16px; padding: 12px 16px; background: #FFFDF8; border: 1px solid var(--rule); line-height: 1.75; }}
  .diff-note strong {{ color: var(--ink); }}
  .pick-hint {{ max-width: 820px; margin-top: 20px; padding: 14px 18px; font-size: 15px; background: rgba(204, 120, 92, 0.12); border-left: 3px solid var(--accent); color: var(--ink); }}
</style>
</head>
<body>

<a class="back" href="index.html">{L['back1']}</a>
<a class="back" href="compare-v6-ref4-hunt.html" style="margin-left: 16px;">{L['back2']}</a>

<h1>{L['h1']}</h1>
<p class="intro">
  {L['intro1']}<strong>{L['intro1b']}</strong>{L['intro1c']}<strong>{L['intro1d']}</strong>{L['intro2']}<strong>{L['intro2b']}</strong>{L['intro2c']}
  {L['intro3']}<strong>A / B / C</strong>{L['intro3b']}
</p>

<div class="need-info">
  <strong>{L['open_h']}</strong>{L['open_b']}
  <code>cd design-demos &amp;&amp; python -m http.server 8765</code>
  &#8594; <code>http://127.0.0.1:8765/logo-fonts/compare-v7-final.html</code>
</div>

<figure class="ref-row">
  <img src="refs/ref-huashu-editorial.png" alt="\u82b1\u53d4 lockup \u53c2\u8003" width="220" />
  <figcaption><b>{L['ref_cap']}</b>{L['ref_txt']}</figcaption>
</figure>

<div class="font-status is-warn" id="font-status" role="status">
  <h3>{L['fs_h']}</h3>
  <ul id="font-status-list"><li>{L['fs_li']}</li></ul>
</div>

<section aria-label="Hero lockup final">
  <h2>{L['sec_h']}</h2>
  <div class="grid">
{card('a', 'a', L['lbl_a'], L['title_a'], L['ref_a'], L['desc_a'])}
{card('b', 'b', L['lbl_b'], L['title_b'], L['ref_b'], L['desc_b'])}
{card('c', 'c', L['lbl_c'], L['title_c'], L['ref_c'], L['desc_c'])}
  </div>

  <div class="diff-note">
    <strong>{L['diff_h']}</strong><br>
    {L['diff_a']}<br>
    {L['diff_b']}<br>
    {L['diff_c']}
  </div>

  <p class="pairing-note">
    <strong>{L['how']}</strong>
    {L['how1']}<strong>A</strong> / <strong>B</strong> / <strong>C</strong>{L['how2']}
  </p>

  <p class="pick-hint">\u6700\u540e\u4e00\u8f6e\u4e86\u2014\u2014\u4e0d\u7528\u7ea0\u7ec6\u8282\uff0c\u770b\u987a\u773c\u5c31\u9009\u3002</p>
</section>

<script>
(function () {{
  var SIZE = '64px';
  var TEST_ZH = '\u5ed6\u667a\u5f3a';
  var TEST_EN = 'Archie';
  var FALLBACK = 'SimSun, serif';
  var CHECKS = [
    {{ id: 'a', keys: ['Noto Serif SC'], label: 'Noto Serif SC 500', card: '.sample-a', weight: '500' }},
    {{ id: 'b', keys: ['LXGW Neo ZhiSong'], label: '\u971e\u9e4c\u65b0\u81fb\u5b8b', card: '.sample-b' }},
    {{ id: 'c', keys: ['Source Han Serif CN for Display'], label: '\u601d\u6e90\u5c4f\u663e\u81fb\u5b8b', card: '.sample-c' }},
    {{ id: 'en', keys: ['Playfair Display'], label: 'Playfair Archie', card: null, test: TEST_EN }}
  ];
  function fontSpec(family, weight) {{
    return (weight ? weight + ' ' : 'normal ') + SIZE + ' "' + family + '"';
  }}
  function visualOk(family, text, weight) {{
    var el = document.createElement('span');
    el.style.cssText = 'position:absolute;left:-9999px;font-size:' + SIZE + ';white-space:nowrap';
    el.textContent = text;
    document.body.appendChild(el);
    el.style.fontFamily = FALLBACK;
    el.style.fontWeight = 'normal';
    var w0 = el.getBoundingClientRect().width;
    el.style.fontFamily = '"' + family + '", ' + FALLBACK;
    el.style.fontWeight = weight || 'normal';
    var w1 = el.getBoundingClientRect().width;
    document.body.removeChild(el);
    return Math.abs(w1 - w0) > 0.5;
  }}
  function checkItem(item) {{
    var test = item.test || TEST_ZH;
    for (var i = 0; i < item.keys.length; i++) {{
      var spec = fontSpec(item.keys[i], item.weight);
      if (document.fonts && document.fonts.check && document.fonts.check(spec, test)) return true;
      if (visualOk(item.keys[i], test, item.weight)) return true;
    }}
    return false;
  }}
  function loadItem(item) {{
    var test = item.test || TEST_ZH;
    return Promise.all(item.keys.map(function (k) {{
      if (!document.fonts || !document.fonts.load) return Promise.resolve();
      return document.fonts.load(fontSpec(k, item.weight), test);
    }}));
  }}
  function run(results) {{
    var list = document.getElementById('font-status-list');
    var panel = document.getElementById('font-status');
    var html = '';
    var allOk = true;
    CHECKS.forEach(function (item, i) {{
      var ok = results[i];
      if (!ok) allOk = false;
      html += '<li class="' + (ok ? 'ok' : 'fail') + '">' + (ok ? '\\u2713' : '\\u2717') + ' ' + item.label + '</li>';
      if (item.card) {{
        var card = document.querySelector(item.card);
        var badge = card && card.querySelector('[data-badge="' + item.id + '"]');
        if (badge) {{
          badge.textContent = ok ? '{L['badge_ok']}' : '{L['badge_fail']}';
          card.classList.toggle('font-fail', !ok);
        }}
      }}
    }});
    if (!allOk) {{
      html += '<li class="fail">{L['file_hint']} <code>http://127.0.0.1:8765/...</code>{L['file_hint2']}</li>';
    }}
    list.innerHTML = html;
    panel.classList.toggle('is-warn', !allOk);
    panel.classList.toggle('is-ok', allOk);
    panel.querySelector('h3').textContent = allOk ? '{L['fs_ok']}' : '{L['fs_bad']}';
  }}
  function start() {{
    if (!document.fonts || !document.fonts.load) {{ run(CHECKS.map(checkItem)); return; }}
    Promise.all(CHECKS.map(loadItem))
      .then(function () {{ return CHECKS.map(checkItem); }})
      .then(run)
      .catch(function () {{ run(CHECKS.map(checkItem)); }});
  }}
  if (document.fonts && document.fonts.ready) {{
    document.fonts.ready.then(function () {{ setTimeout(start, 400); }});
  }} else {{
    window.addEventListener('load', function () {{ setTimeout(start, 600); }});
  }}
}})();
</script>
</body>
</html>
"""

OUT.write_text(html, encoding="utf-8", newline="\n")
print("Wrote", OUT)
