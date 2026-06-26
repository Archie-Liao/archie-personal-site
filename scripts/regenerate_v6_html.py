# -*- coding: utf-8 -*-
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "design-demos" / "logo-fonts" / "compare-v6-ref4-hunt.html"

L = {
    "title": "Logo v6 \u00b7 Ref-4 \u5b57\u5f62\u72e9\u730e",
    "zh": "\u5ed6\u667a\u5f3a",
    "back1": "\u2190 logo-fonts",
    "back2": "\u2190 v3 \u6392\u7248\u53c2\u8003",
    "h1": "Logo v6 \u00b7 Ref-4 \u5b57\u5f62\u72e9\u730e",
    "intro1": "ref-4\u300c\u4eba\u985e\u300d\u53ea\u53d6",
    "intro1b": "\u5b57\u5f62",
    "intro1c": "\uff08\u6781\u7aef\u9ad8\u5bf9\u6bd4\u5b8b/\u660e\uff09\uff0c\u4e0d\u53d6\u7ea2\u5e95\u914d\u8272\u3002",
    "intro2": "\u672c\u8f6e\u5bf9\u6807 ref-4 \u7684\u601d\u6e90\u6539\u9020\u5b8b\uff1a",
    "intro2a": "\u88c5\u7532\u660e\u671d",
    "intro2b": "\u9999\u8346\u523b\u5b8b",
    "intro3": "\uff1b\u4fdd\u7559\u4f60\u8ba4\u53ef\u7684",
    "intro3a": "\u5200\u96b6",
    "intro3b": "Noto 900",
    "intro4": " \u4f5c\u5bf9\u7167\u3002\u6392\u7248\u4e0e v3 \u4e00\u81f4\uff1aHero \u6a2a\u6392 + \u9876\u680f nav\u3002",
    "open_h": "\u6253\u5f00\u65b9\u5f0f\uff1a",
    "open_b": "\u8bf7\u7528\u672c\u5730\u670d\u52a1\u5668\uff0c\u52ff file:// \u53cc\u51fb\u3002",
    "li1": "\u88c5\u7532 / \u9999\u8346\u82e5\u672a\u52a0\u8f7d \u2192 TTF \u653e\u5165",
    "li1b": "\uff0c\u8fd0\u884c",
    "li2": "\u6e90\u754c\u660e\u671d BOOTH \u96be\u4e0b\uff0c\u5df2\u4e0d\u5217\u5165",
    "ref_alt": "ref-4 \u4eba\u985e \u6d77\u62a5\u5b8b",
    "ref_cap": "Ref-4 \u00b7 \u5b57\u5f62\u53c2\u8003",
    "ref_txt": "\uff08\u8272\u7968\u5ffd\u7565\uff09\u6a2a\u7ad6\u5bf9\u6bd4\u6781\u5927\u3001\u886c\u7ebf\u5c16\uff1b\u8981 Display \u660e\u671d\uff0c\u4e0d\u662f\u6b63\u6587\u5b8b / \u5c4f\u663e\u81fb\u5b8b / \u971e\u9e4c\u3002",
    "fs_h": "\u5b57\u4f53\u52a0\u8f7d\u68c0\u6d4b \u00b7 \u68c0\u6d4b\u4e2d\u2026",
    "fs_li": "\u9a8c\u8bc1\u672c\u5730 fonts/ \u2026",
    "sec_h": "Hero \u5927\u6807\u9898 \u00b7 \u56db\u680f\uff08\u5200\u96b6 + Noto900 + Ref-4 \u540c\u7c7b\uff09",
    "checking": "\u68c0\u6d4b\u4e2d\u2026",
    "lbl_ctrl": "\u5bf9\u7167",
    "daoli": "\u5200\u96b6\u4f53",
    "daoli_ref": "\u4f60\u8bf4\u300c\u52c9\u5f3a\u53ef\u4ee5\u300d\u00b7 \u4fdd\u7559",
    "daoli_desc": "\u963f\u91cc\u5988\u5988\u5200\u96b6 \u00b7 \u65b9\u7b14\u7891\u523b\u3002\u4e0e ref-4 \u6d77\u62a5\u5b8b\u4e0d\u540c\u8d5b\u9053\uff0c\u4f5c\u6c14\u8d28\u5bf9\u7167\u3002",
    "lbl_ok": "\u5b8b\u7cfb \u00b7 \u4f60\u8ba4\u53ef",
    "noto_ref": "\u6b63\u7edf\u91cd\u5b8b \u00b7 \u6700\u7a33\u5bf9\u7167",
    "noto_desc": "\u601d\u6e90\u5b8b\u6700\u91cd\u6863\u3002\u82e5 F/G \u6539\u9020\u5b8b\u4e0d\u591f\u8d34 ref-4\uff0c\u8fd9\u6863\u53ef\u80fd\u662f\u4e0a\u9650\u3002",
    "lbl_f": "Ref-4 \u5019\u9009 F",
    "soukou": "\u88c5\u7532\u660e\u671d",
    "soukou_ref": "\u6a2a\u6781\u7ec6 \u00b7 \u6d77\u62a5\u51b2\u51fb",
    "soukou_desc": "Soukou Mincho \u00b7 \u601d\u6e90\u5b8b\u6539\u9020\uff0c\u6a2a\u5411\u7b14\u753b\u524a\u81f3\u6781\u9650\u3002",
    "lbl_g": "Ref-4 \u5019\u9009 G",
    "kesong": "\u9999\u8346\u523b\u5b8b",
    "kesong_ref": "\u96d5\u523b\u5b8b \u00b7 \u7b14\u753b\u5c16",
    "kesong_desc": "\u601d\u6e90\u5b8b\u6539\u9020\uff0c\u7b80\u4f53\u53cb\u597d\u3002",
    "nav_lbl": "\u9876\u680f nav",
    "how": "\u600e\u4e48\u9009\uff1a",
    "how1": "\u5148\u770b Hero\u300c",
    "how1b": " + Archie\u300d\u54ea\u6863\u6700\u63a5\u8fd1 ref-4 \u7684",
    "how1c": "\u5b57\u5f62\u5f20\u529b",
    "how2": "\uff08\u4e0d\u662f\u80cc\u666f\u8272\uff09\uff1b\u518d\u770b\u9876\u680f nav \u5c0f\u5b57\u662f\u5426\u4ecd\u53ef\u8bfb\u3002",
    "how3": "\u56de\u590d\u4f8b\u5982\u300cF \u6700\u8d34 ref-4\u300d\u300cG \u5c16\u4f46 nav \u7cca\u300d\u300c\u8fd8\u662f Noto900\u300d\u3002",
    "ret_h": "v5 \u5df2\u6dd8\u6c70\uff1a",
    "ret1": "Noto 500",
    "ret2": "\u971e\u9e4c\u65b0\u81fb\u5b8b",
    "ret3": "\u601d\u6e90\u5c4f\u663e\u81fb\u5b8b",
    "ret4": "\u2014 \u4e0e ref-4 \u6d77\u62a5\u5b8b\u4e0d\u662f\u540c\u4e00\u7c7b\u3002",
    "lbl_daoli": "\u5200\u96b6\u4f53",
    "lbl_soukou": "\u88c5\u7532\u660e\u671d",
    "lbl_kesong": "\u9999\u8346\u523b\u5b8b",
    "badge_ok": "\u2713 \u5df2\u52a0\u8f7d",
    "badge_fail": "\u2717 \u672a\u52a0\u8f7d\uff08\u7cfb\u7edf\u56de\u9000\uff09",
    "pending_h": "\u5f85\u4e0b\u8f7d\uff1a",
    "pending_sep": "\u3001",
    "pending_tail": " \u2014 \u89c1",
    "file_hint": "\u8bf7\u7528",
    "file_hint2": " \u6253\u5f00\uff08\u975e file://\uff09",
    "fs_ok": "\u5b57\u4f53\u52a0\u8f7d\u68c0\u6d4b \u00b7 \u5168\u90e8 OK",
    "fs_bad": "\u5b57\u4f53\u52a0\u8f7d\u68c0\u6d4b \u00b7 \u6709\u5b57\u4f53\u672a\u52a0\u8f7d",
}

def card(sample, badge_id, extra_class, label, title, ref, desc, link_html=""):
    d = desc + link_html
    return f"""
    <article class="card {extra_class} sample-{sample}" data-sample="{sample}">
      <span class="load-badge" data-badge="{badge_id}">{L['checking']}</span>
      <div class="card-label">{label}</div>
      <div class="card-title">{title}</div>
      <div class="card-ref">{ref}</div>
      <p class="card-desc">{d}</p>
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
<style>
  @font-face {{
    font-family: 'Logo-Daoli';
    src: url('fonts/AlimamaDaoLiTi.woff2') format('woff2');
    font-weight: normal; font-display: swap;
  }}
  @font-face {{
    font-family: 'Logo-Noto-900';
    src: url('fonts/NotoSerifSC-900.woff2') format('woff2');
    font-weight: normal; font-display: swap;
  }}
  @font-face {{
    font-family: 'Logo-Soukou';
    src: url('fonts/SoukouMincho-logo.woff2') format('woff2');
    font-weight: normal; font-display: swap;
  }}
  @font-face {{
    font-family: 'Logo-Kesong';
    src: url('fonts/XiangcuiKesong-logo.woff2') format('woff2');
    font-weight: normal; font-display: swap;
  }}
  @font-face {{
    font-family: 'Playfair Display';
    src: url('fonts/PlayfairDisplay-600-italic.woff2') format('woff2');
    font-weight: 600; font-style: italic; font-display: swap;
  }}
  :root {{
    --paper: #F5F0E8; --paper-2: #EFE7D8; --ink: #191919; --ink-warm: #5A4F44;
    --ink-print: #4A4238; --ink-soft: #6E6557; --accent: #CC785C;
    --rule: rgba(25, 25, 25, 0.12);
    --serif-en: 'Playfair Display', Georgia, serif;
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
  .need-info ul {{ margin: 8px 0 0; padding-left: 1.2em; }}
  .need-info li {{ margin-bottom: 6px; }}
  .ref-row {{ display: grid; grid-template-columns: 200px 1fr; align-items: start; max-width: 820px; margin-bottom: 28px; font-size: 13px; color: var(--ink-soft); }}
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
  .grid {{ display: grid; grid-template-columns: repeat(4, 1fr); max-width: 1280px; margin-bottom: 16px; column-gap: 16px; row-gap: 16px; }}
  @media (max-width: 1100px) {{ .grid {{ grid-template-columns: repeat(2, 1fr); }} }}
  @media (max-width: 560px) {{ .grid {{ grid-template-columns: 1fr; }} }}
  .card {{ background: #FFFDF8; border: 1px solid var(--rule); padding: 18px 16px 16px; display: flex; flex-direction: column; }}
  .card.is-current {{ outline: 2px solid rgba(204, 120, 92, 0.45); outline-offset: -2px; }}
  .card.is-ok {{ outline: 2px solid rgba(60, 90, 74, 0.25); outline-offset: -2px; }}
  .card-label {{ font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-soft); margin-bottom: 4px; }}
  .card-title {{ font-weight: 600; font-size: 15px; letter-spacing: 0.04em; margin-bottom: 6px; }}
  .card-ref {{ font-size: 11px; color: var(--accent); margin-bottom: 8px; letter-spacing: 0.04em; }}
  .card-desc {{ font-size: 12px; color: var(--ink-soft); line-height: 1.55; margin-bottom: 16px; flex: 1; }}
  .card-desc a {{ color: var(--accent); }}
  .load-badge {{ display: inline-block; margin-bottom: 8px; padding: 2px 7px; font-size: 10px; letter-spacing: 0.08em; border-radius: 3px; background: var(--paper-2); color: var(--ink-soft); }}
  .card.font-fail {{ outline: 2px dashed rgba(180, 60, 40, 0.55); outline-offset: -2px; }}
  .card.font-fail .load-badge {{ background: rgba(180, 60, 40, 0.12); color: #B43C28; }}
  .preview-hero {{ padding-top: 10px; border-top: 1px solid var(--rule); min-height: 130px; }}
  .wordmark {{ margin: 0; }}
  .wordmark .zh {{ display: block; font-size: 50px; line-height: 1; letter-spacing: 0.03em; font-weight: normal !important; font-synthesis: none; }}
  .wordmark .en {{ display: block; font-family: var(--serif-en); font-style: italic; font-weight: 600; font-size: 40px; line-height: 1.05; letter-spacing: 0.005em; margin-top: 8px; margin-left: 2px; color: var(--ink); }}
  .preview-nav {{ margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--rule); }}
  .preview-nav-label {{ font-size: 10px; letter-spacing: 0.12em; color: var(--ink-soft); margin-bottom: 6px; }}
  .nav-wordmark {{ display: inline-flex; align-items: baseline; }}
  .nav-wordmark .zh {{ font-size: 1.05rem; font-weight: normal !important; font-synthesis: none; }}
  .nav-wordmark .en {{ font-family: var(--serif-en); font-style: italic; font-weight: 600; font-size: 0.82rem; color: var(--ink-soft); }}
  .nav-wordmark .en::before {{ content: '\\00b7'; margin: 0 8px; font-style: normal; opacity: 0.55; }}
  .sample-daoli .zh {{ font-family: 'Logo-Daoli', serif; color: var(--ink-print); letter-spacing: 0.02em; }}
  .sample-noto900 .zh {{ font-family: 'Logo-Noto-900', serif; color: var(--ink); letter-spacing: 0.04em; }}
  .sample-soukou .zh {{ font-family: 'Logo-Soukou', serif; color: var(--ink-print); letter-spacing: 0.04em; }}
  .sample-kesong .zh {{ font-family: 'Logo-Kesong', serif; color: var(--ink-print); letter-spacing: 0.04em; }}
  .pairing-note {{ max-width: 820px; font-size: 13px; color: var(--ink-soft); margin-top: 24px; padding: 12px 16px; background: rgba(60, 90, 74, 0.06); border: 1px solid rgba(60, 90, 74, 0.15); }}
  .retired {{ max-width: 820px; margin-top: 28px; padding: 12px 16px; font-size: 12px; color: var(--ink-soft); background: var(--paper-2); border: 1px solid var(--rule); }}
  .retired s {{ color: #999; }}
</style>
</head>
<body>

<a class="back" href="index.html">{L['back1']}</a>
<a class="back" href="compare-en-pairing.html" style="margin-left: 16px;">{L['back2']}</a>

<h1>{L['h1']}</h1>
<p class="intro">
  {L['intro1']}<strong>{L['intro1b']}</strong>{L['intro1c']}
  {L['intro2']}<strong>{L['intro2a']}</strong>\u3001<strong>{L['intro2b']}</strong>{L['intro3']}<strong>{L['intro3a']}</strong>\u3001<strong>{L['intro3b']}</strong>{L['intro4']}
</p>

<div class="need-info">
  <strong>{L['open_h']}</strong>{L['open_b']}
  <code>cd design-demos &amp;&amp; python -m http.server 8765</code>
  &#8594; <code>http://127.0.0.1:8765/logo-fonts/compare-v6-ref4-hunt.html</code>
  <ul>
    <li>{L['li1']} <code>fonts/_incoming/</code>{L['li1b']} <code>python scripts/subset-logo-ref4-fonts.py</code></li>
    <li>{L['li2']}</li>
  </ul>
</div>

<figure class="ref-row">
  <img src="refs/ref-4-blood-red.png" alt="{L['ref_alt']}" width="200" />
  <figcaption><b>{L['ref_cap']}</b>{L['ref_txt']}</figcaption>
</figure>

<div class="font-status is-warn" id="font-status" role="status">
  <h3>{L['fs_h']}</h3>
  <ul id="font-status-list"><li>{L['fs_li']}</li></ul>
</div>

<section aria-label="Hero lockup">
  <h2>{L['sec_h']}</h2>
  <div class="grid">
{card('daoli', 'daoli', 'is-current', L['lbl_ctrl'], L['daoli'], L['daoli_ref'], L['daoli_desc'])}
{card('noto900', 'noto900', 'is-ok', L['lbl_ok'], 'Noto Serif SC 900', L['noto_ref'], L['noto_desc'])}
{card('soukou', 'soukou', '', L['lbl_f'], L['soukou'], L['soukou_ref'], L['soukou_desc'], '<a href="https://flopdesign.booth.pm/items/1028555" target="_blank" rel="noopener">BOOTH</a>')}
{card('kesong', 'kesong', '', L['lbl_g'], L['kesong'], L['kesong_ref'], L['kesong_desc'], '<a href="https://github.com/Miiiller/Xiangcui-Kesong" target="_blank" rel="noopener">GitHub</a>')}
  </div>

  <p class="pairing-note">
    <strong>{L['how']}</strong>
    {L['how1']}{L['zh']}{L['how1b']}<strong>{L['how1c']}</strong>{L['how2']}
    {L['how3']}
  </p>
</section>

<div class="retired">
  <strong>{L['ret_h']}</strong>
  <s>{L['ret1']}</s> &middot; <s>{L['ret2']}</s> &middot; <s>{L['ret3']}</s> {L['ret4']}
</div>

<script>
(function () {{
  var SIZE = '64px';
  var TEST_ZH = '\\u5ed6';
  var TEST_EN = 'Archie';
  var FALLBACK = 'SimSun, serif';
  var MARK_OK = '\\u2713';
  var MARK_FAIL = '\\u2717';
  var LBL = {{
    daoli: '{L['lbl_daoli']}',
    noto900: 'Noto Serif SC 900',
    soukou: '{L['lbl_soukou']}',
    kesong: '{L['lbl_kesong']}',
    en: 'Playfair Archie'
  }};
  var CHECKS = [
    {{ id: 'daoli', family: 'Logo-Daoli', label: LBL.daoli, card: '.sample-daoli' }},
    {{ id: 'noto900', family: 'Logo-Noto-900', label: LBL.noto900, card: '.sample-noto900' }},
    {{ id: 'soukou', family: 'Logo-Soukou', label: LBL.soukou, card: '.sample-soukou', file: 'SoukouMincho-logo.woff2' }},
    {{ id: 'kesong', family: 'Logo-Kesong', label: LBL.kesong, card: '.sample-kesong', file: 'XiangcuiKesong-logo.woff2' }},
    {{ id: 'en', family: 'Playfair Display', label: LBL.en, card: null, test: TEST_EN }}
  ];
  function fontSpec(family) {{ return 'normal ' + SIZE + ' "' + family + '"'; }}
  function visualOk(family, text) {{
    var el = document.createElement('span');
    el.style.cssText = 'position:absolute;left:-9999px;font-size:' + SIZE + ';white-space:nowrap';
    el.textContent = text;
    document.body.appendChild(el);
    el.style.fontFamily = FALLBACK;
    var w0 = el.getBoundingClientRect().width;
    el.style.fontFamily = '"' + family + '", ' + FALLBACK;
    var w1 = el.getBoundingClientRect().width;
    document.body.removeChild(el);
    return Math.abs(w1 - w0) > 0.5;
  }}
  function checkItem(item) {{
    var test = item.test || TEST_ZH;
    var spec = fontSpec(item.family);
    if (document.fonts && document.fonts.check && document.fonts.check(spec, test)) return true;
    return visualOk(item.family, test);
  }}
  function loadItem(item) {{
    var test = item.test || TEST_ZH;
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    return document.fonts.load(fontSpec(item.family), test);
  }}
  function run(results) {{
    var list = document.getElementById('font-status-list');
    var panel = document.getElementById('font-status');
    var html = '';
    var allOk = true;
    var pending = [];
    CHECKS.forEach(function (item, i) {{
      var ok = results[i];
      if (!ok) {{ allOk = false; if (item.file) pending.push(item.label); }}
      html += '<li class="' + (ok ? 'ok' : 'fail') + '">' + (ok ? MARK_OK : MARK_FAIL) + ' ' + item.label + '</li>';
      if (item.card) {{
        var card = document.querySelector(item.card);
        var badge = card && card.querySelector('[data-badge="' + item.id + '"]');
        if (badge) {{
          badge.textContent = ok ? '{L['badge_ok']}' : '{L['badge_fail']}';
          card.classList.toggle('font-fail', !ok);
        }}
      }}
    }});
    if (pending.length) {{
      html += '<li class="fail"><strong>{L['pending_h']}</strong>' + pending.join('{L['pending_sep']}') + '{L['pending_tail']} <code>fonts/_incoming/README.md</code></li>';
    }}
    if (!allOk && !pending.length) {{
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
