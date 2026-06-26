# design-demos 博物版画素材

公共领域 / 开放获取复古自然史图版，本地自托管供 `press.html` 等 demo 使用。

## 当前库存（16 张，MD5 均已去重）

| 文件 | 来源 | 主题 |
|------|------|------|
| `vintage_butterfly_engraving_The_butterflies_of_the_east.jpg` | 既有 | 新英格兰蝴蝶 |
| `vintage_moth_lithograph_Butterflies_and_moths__Plate_XX.jpg` | 既有 | 天蛾 |
| `vintage_moth_lithograph_British_moths_and_their_transfo.jpg` | 既有 | 英国蛾类 |
| `Pieris_butterfly_plate_Illustrations_of_new_species_of_.jpg` | 既有 | 粉蝶 JPG |
| `Pieris_butterfly_plate_Pieris_wollastoni-PD.png` | Wikimedia API | 粉蝶 PNG |
| `antique_botanical_illustration_plate_A_collection_of_an.jpg` | 既有 | 植物图录 |
| `antique_botanical_illustration_plate_Botanical_extracts.jpg` | 既有 | 植物提取 |
| `botanical_redoute_rose_pontiana.jpg` | Wikimedia API | Redouté 玫瑰 |
| `botanical_redoute_regalis.jpg` | Wikimedia API | Redouté 蔷薇 |
| `bhl_curtis_botanical_magazine_plate.jpg` | BHL pageimage | Curtis 杂志 |
| `bhl_butterflies_new_england_plate.jpg` | BHL pageimage | Scudder 蝴蝶 |
| `bhl_insect_plate_engraving.jpg` | BHL pageimage | 昆虫版画 |
| `bhl_moth_transformation_plate.jpg` | BHL pageimage | 蛾类变态 |
| `bhl_ferns_botanical_plate.jpg` | BHL pageimage | 蕨类 |
| `bhl_gould_bird_plate.jpg` | BHL pageimage | Gould 鸟类 |
| `bhl_botanical_magazine_flower.jpg` | BHL pageimage | 植物花图 |
| `bhl_shells_conchology_plate.jpg` | BHL pageimage | 贝类（偏小，可换） |

## 来源说明

- **[Biodiversity Heritage Library](https://www.biodiversitylibrary.org/)** — 博物馆/图书馆联盟扫描，古籍图版多为 Public Domain
- **[Wikimedia Commons](https://commons.wikimedia.org/)** — 通过 API 解析直链，勿手猜 URL
- 计划扩展：Met Open Access、Smithsonian Open Access、Europeana（PD 筛选）

## 补图脚本

```powershell
cd design-demos/assets/img
powershell -ExecutionPolicy Bypass -File _fetch-new.ps1
```

脚本会 MD5 去重；重复文件自动删除。

## 已删除的重复别名

`Curtis_s_botanical`（= A_collection）、`plate_Butterflies_and_moths`、`British_moths_larv` 副本等 — 勿再 Copy-Item 造假名。
