#!/usr/bin/env python3
"""Subset logo fonts to woff2 for 廖智强Archie. Run after placing TTF in fonts/_incoming/."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent / "design-demos" / "logo-fonts" / "fonts"
INCOMING = ROOT / "_incoming"
OUT = ROOT
TEXT = "廖智强Archie"

SOURCES = {
    "SoukouMincho": ["SoukouMincho.ttf", "soukoumincho.ttf"],
    "XiangcuiKesong": [
        "Xiangcui-Kesong.ttf",
        "XiangcuiKesong.ttf",
        "香萃刻宋（目前最新版）.ttf",
    ],
}


def find_incoming(name: str) -> Path | None:
    for fn in SOURCES[name]:
        p = INCOMING / fn
        if p.is_file():
            return p
    # 香萃：任意含「香萃」的 ttf
    if name == "XiangcuiKesong":
        for p in sorted(INCOMING.glob("*.ttf")):
            if "香萃" in p.name or "xiangcui" in p.name.lower():
                return p
    return None


def subset(name: str, src: Path) -> None:
    out = OUT / f"{name}-logo.woff2"
    cmd = [
        sys.executable,
        "-m",
        "fontTools.subset",
        str(src),
        f"--text={TEXT}",
        f"--output-file={out}",
        "--flavor=woff2",
        "--layout-features=*",
    ]
    print(" ".join(cmd))
    subprocess.check_call(cmd)
    print(f"OK {out} ({out.stat().st_size} bytes)")


def main() -> None:
    INCOMING.mkdir(parents=True, exist_ok=True)
    ok = 0
    for name in SOURCES:
        src = find_incoming(name)
        if not src:
            print(f"SKIP {name}: put TTF in {INCOMING}")
            continue
        subset(name, src)
        ok += 1
    if ok == 0:
        sys.exit(1)


if __name__ == "__main__":
    main()
