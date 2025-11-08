# Click Magazine Archive# Click Magazine Archive



**Digital preservation of Israeli gaming history****Digital preservation of Israeli gaming history**



A searchable archive of **Click Magazine** - Israel's pioneering gaming magazine from the early 2000s. Browse all 10 issues, search through 273 indexed items in Hebrew and English, and relive the golden age of PC gaming.A searchable archive of **Click Magazine** - Israel's pioneering gaming magazine from the early 2000s. Browse all 10 issues, search through 273 indexed items in Hebrew and English, and relive the golden age of PC gaming.



## 🎮 About Click Magazine



**Click** was Israel's premier gaming magazine, published from 2000-2001. In just 10 issues, it captured the essence of PC gaming's golden age - from the excitement of Diablo 2 and Deus Ex to the promise of Windows ME and the arrival of PlayStation 2.## 🎮 Project Overview### Goal



Each issue featured:Generate `data/click_index_with_pages.xlsx` containing original rows plus:

- **Game Reviews**: In-depth coverage of the latest PC games

- **Hardware & Gadgets**: Reviews of cutting-edge tech**Click Magazine** was a comprehensive Israeli gaming magazine that covered:- `page`: Best-matching page (1-based)

- **Articles**: Gaming culture, tutorials, and industry insights

- **Cheat Codes**: Essential tips for popular games- PC game reviews and previews- `match_score`: Fuzzy match confidence (RapidFuzz)

- **Kids Corner**: Educational and children's games

- Gaming hardware and gadgets- `alt_page` / `alt_score`: Second-best candidate (if useful for manual verification)

## 🌐 Explore the Archive

- Cheat codes and tips- `ocr_note`: Notes like `low-confidence`

### 📖 Read the Magazines

All 10 issues are preserved and freely accessible on Archive.org:- Articles about gaming culture and technology



- **Full Collection**: [archive.org/details/click_magazine](https://archive.org/details/click_magazine)- Kids games and educational software### Approach



**Individual Issues:**1. PDF pages are converted to images (cached under `.cache/pages/`).

- [Issue 1](https://archive.org/details/click-magazine-issue-01) - MDK 2, Diablo 2, Daikatana

- [Issue 2](https://archive.org/details/click-magazine-issue-02) - Windows ME, Dark Reign 2This archive preserves the complete collection with:2. OCR is performed with Tesseract (Hebrew + English) (cached under `.cache/ocr/`).

- [Issue 3](https://archive.org/details/click-magazine-issue-03) - Deus Ex, Asheron's Call

- [Issue 4](https://archive.org/details/click-magazine-issue-04) - The Sims, Carmageddon TDR- ✅ All 10 PDF issues (stored locally)3. Text and item titles are normalized (lowercase, stripped punctuation, Hebrew RTL heuristics).

- [Issue 5](https://archive.org/details/click-magazine-issue-05) - C&C: Red Alert 2, Baldur's Gate 2

- [Issue 6](https://archive.org/details/click-magazine-issue-06) - The Longest Journey, Black & White- ✅ Comprehensive searchable index (273 items)4. RapidFuzz scores item variants against every page.

- [Issue 7](https://archive.org/details/click-magazine-issue-07) - PlayStation 2 Special

- [Issue 8](https://archive.org/details/click-magazine-issue-08) - Fallout Tactics, Gangsters 2- ✅ Modern web interface with Archive.org integration5. Results exported to a new Excel file (original not modified).

- [Issue 9](https://archive.org/details/click-magazine-issue-09) - Windows XP, Arcade Special

- [Issue 10](https://archive.org/details/click-magazine-issue-10) - Black & White, Tropico- ✅ Bilingual search (Hebrew & English)



### 🖥️ Interactive Archive Website- ✅ GitHub Pages deployment ready### Setup (macOS)

This repository powers a modern, searchable web interface where you can:

- **Browse** magazine covers in a visual galleryInstall system dependencies first:

- **Search** 273 items in Hebrew and English

- **Filter** by category (games, articles, gadgets, cheat codes)## 📁 Repository Structure

- **Read** magazines through an embedded Archive.org viewer

- **Enjoy** responsive design on any device```bash



## ✨ Features```brew install tesseract



- **📚 Visual Gallery** - Browse all 10 magazine coversclick-archive/brew install poppler   # needed for pdf2image

- **🔍 Real-time Search** - Instant results as you type

- **🌐 Bilingual** - Full Hebrew and English support├── data/```

- **🏷️ Category Filters** - 5 content categories

- **📖 Embedded Reader** - Archive.org integration│   ├── click_magazine_issues/     # All 10 PDF files (click-01.pdf to click-10.pdf)

- **⚡ Lightning Fast** - Static site, no backend

- **📱 Responsive** - Works on all devices│   ├── click_index.xlsx           # Original Excel indexOptional (for improved OCR on tough pages) you can also install EasyOCR (Torch), but it's not required for the baseline script:



## 📊 Archive Statistics│   └── click_index.json           # Generated searchable index



| Category | Count | Description |├── docs/                          # GitHub Pages website```bash

|----------|-------|-------------|

| 🎮 Game Reviews | 126 | PC game reviews and previews |│   ├── index.html                 # Main pagepip install easyocr

| 📰 Articles | 50 | Gaming culture and technology |

| 🔧 Gadgets | 24 | Hardware reviews |│   ├── styles.css                 # Modern responsive styling```

| 🎯 Cheat Codes | 42 | Game tips and tricks |

| 👶 Kids Games | 31 | Educational software |│   ├── app.js                     # Search & viewer logic

| **Total** | **273** | Across 10 issues |

│   ├── click_index.json           # Data for website### Python Environment

## 🚀 Quick Start

│   └── README.md                  # Website documentationInstall project dependencies (if not already in a virtual environment):

### View Locally

├── scripts/

```bash

cd docs│   ├── build_index.py             # Generate JSON from Excel ⭐ Main tool```bash

python -m http.server 8000

# Visit http://localhost:8000│   └── build_page_index.py        # OCR page matching (legacy)pip install -e .

```

├── pyproject.toml                 # Python dependencies```

### Deploy to GitHub Pages

└── README.md                      # This file

1. Push this repository to GitHub (must be **public**)

2. Go to **Settings** → **Pages**```Or individually (already listed in `pyproject.toml`):

3. Select **Deploy from a branch**

4. Choose **main** branch and **/docs** folder

5. Click **Save**

## 🚀 Quick Start```bash

Your archive will be live at: `https://YOUR_USERNAME.github.io/click-magazine-archive/`

pip install pandas pdf2image Pillow pytesseract rapidfuzz unidecode openpyxl tqdm opencv-python-headless

## 🛠️ Development

### View the Website Locally```

### Rebuild Index



If you need to regenerate the searchable index:

```bash### Running the Script

```bash

pip install -e .cd docs

python scripts/build_index.py

cp data/click_index.json docs/python -m http.server 8000```bash

```

# Visit http://localhost:8000python scripts/build_page_index.py            # process all issues

### Tech Stack

```python scripts/build_page_index.py --issue 1  # only issue 1 for quick test

- Pure HTML5, CSS3, JavaScript (no frameworks)

- Google Fonts (Heebo & Rubik for Hebrew)python scripts/build_page_index.py --force    # rebuild caches (re-OCR)

- Archive.org embedded viewer

- PyMuPDF for cover extraction### Building the Indexpython scripts/build_page_index.py --min-score 60  # adjust confidence threshold



## 📝 Creditspython scripts/build_page_index.py --limit 50       # limit number of rows (dev)



- **Magazine Preservation**: [Internet Archive](https://archive.org/details/click_magazine)If you need to rebuild the searchable JSON index:```

- **Original Magazine**: Click Magazine (2000-2001)

- **Website Development**: This repository



## 🤝 Contributing```bashThe enriched file will appear at `data/click_index_with_pages.xlsx`.



Contributions welcome! Especially:# Install dependencies

- Additional game name translations

- Corrections to the indexpip install -e .### Caching Details

- UI/UX improvements

- Bug reports- Page images: `.cache/pages/issueXX/page_YYY.jpg`



## 📜 License# Run the index builder- OCR text: `.cache/ocr/issueXX/page_YYY.txt`



Archive website and indexing code provided for historical preservation. Original magazine content © Click Magazine and respective publishers.python scripts/build_index.pyRe-run with `--force` to regenerate.



---



**Preserving Israeli gaming culture, one magazine at a time** 🎮# Copy to docs folder### Hebrew OCR Notes



*For questions or contributions, please open an issue.*cp data/click_index.json docs/Hebrew right-to-left scanning can occasionally invert token order; the script creates variant forms of each item (normal + reversed tokens) to improve matching.


```

### Validation & Manual Review

### Deploy to GitHub PagesItems marked `low-confidence` (score below threshold) should be manually inspected. Use `alt_page` as a secondary candidate. Adjust `--min-score` if results are too sparse or too noisy.



1. Push this repository to GitHub### Future Enhancements

2. Go to **Settings** → **Pages**- Integrate EasyOCR fallback and choose best OCR text per page.

3. Set source to **Deploy from a branch**- Add manual override mapping file (CSV) to patch incorrect matches.

4. Select **main branch** and **/docs folder**- Export a JSON search index (page text + coordinates) for building a small web UI.

5. Click **Save**- Per-page segmentation to isolate article blocks instead of whole pages.



Your site will be live at: `https://[username].github.io/click-archive/`### Troubleshooting

| Problem | Cause | Fix |

## ✨ Website Features|---------|-------|-----|

| TesseractError | Language data missing | `brew install tesseract` then retry |

- **📚 Magazine Gallery**: Browse all 10 issues with visual covers| Poppler error | Missing PDF renderer | `brew install poppler` |

- **🔍 Real-time Search**: Instant results as you type| Empty OCR text | Low-quality scan | Try increasing contrast or EasyOCR |

- **🌐 Bilingual**: Search in Hebrew or English| Wrong page selected | Fuzzy false positive | Inspect `alt_page`, adjust threshold |

- **🏷️ Category Filters**: Filter by game reviews, articles, gadgets, cheat codes, kids games

- **📖 Embedded Viewer**: Read magazines via Archive.org integration### License / Data

- **⚡ Lightning Fast**: Static site, no backend requiredOriginal PDFs and index remain unchanged; this process generates derivative metadata only.

- **📱 Responsive**: Beautiful on mobile, tablet, and desktop


## 📊 Data Structure

### Source: Excel Index (`data/click_index.xlsx`)

- **6 columns**: Issue, Game Reviews, Articles, Gadgets, Cheatcodes, Kids
- **126 rows** with content (after removing empty rows)
- **Important**: Each column cell is a separate item

### Output: JSON Index (`data/click_index.json`)

Structured searchable format with 273 items:

```json
{
  "metadata": {
    "title": "Click Magazine Archive",
    "total_issues": 10,
    "total_items": 273,
    "categories": ["game_review", "article", "gadget", "cheatcode", "kids_game"]
  },
  "issues": [
    {
      "issue_number": 1,
      "archive_url": "https://archive.org/details/click_magazine/click-01/",
      "items": [...]
    }
  ],
  "items": [
    {
      "id": 1,
      "issue": 1,
      "category": "game_review",
      "category_display": "Game Reviews",
      "name_english": "MDK 2",
      "name_hebrew": "MDK 2",
      "name_normalized": "mdk 2 mdk 2",
      "archive_url": "https://archive.org/details/click_magazine/click-01/"
    }
  ]
}
```

## 🌐 Archive.org Integration

All magazines are preserved at Archive.org:

- **Collection**: https://archive.org/details/click_magazine
- **Issue URLs**: `https://archive.org/details/click_magazine/click-{number:02d}/`
- **Examples**:
  - Issue 1: https://archive.org/details/click_magazine/click-01/
  - Issue 10: https://archive.org/details/click_magazine/click-10/

The website embeds Archive.org's viewer for seamless browsing.

## 📈 Archive Statistics

| Category | Items | Description |
|----------|-------|-------------|
| **Game Reviews** | 126 | Reviews and previews of PC games |
| **Articles** | 50 | Gaming culture, tutorials, technology |
| **Gadgets** | 24 | Hardware reviews and tech gadgets |
| **Cheatcodes** | 42 | Game tips and cheat codes |
| **Kids Games** | 31 | Educational and children's games |
| **TOTAL** | **273** | Across 10 issues |

### Issues Breakdown

| Issue | Items | Year | Highlights |
|-------|-------|------|------------|
| Issue 1 | 16 | 2000 | MDK 2, Diablo 2, Daikatana |
| Issue 2 | 19 | 2000 | Windows ME, Dark Reign 2 |
| Issue 3 | 21 | 2000 | Deus Ex, Asheron's Call |
| Issue 4 | 20 | 2000 | The Sims, Carmageddon TDR |
| Issue 5 | 38 | 2000 | C&C: Red Alert 2, Baldur's Gate 2 |
| Issue 6 | 25 | 2001 | The Longest Journey, Black & White |
| Issue 7 | 41 | 2001 | PlayStation 2 Special |
| Issue 8 | 37 | 2001 | Fallout Tactics, Gangsters 2 |
| Issue 9 | 32 | 2001 | Windows XP, Arcade Special |
| Issue 10 | 24 | 2001 | Black & White, Tropico |

## 🛠 Development

### Python Environment

```bash
# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -e .
```

### Required Packages

- `pandas` - Excel processing
- `openpyxl` - Excel file format support

### Main Scripts

#### `scripts/build_index.py` ⭐

The primary tool for generating the searchable index:

- Reads `data/click_index.xlsx`
- **Splits each column into independent items** (crucial!)
- Generates bilingual names (Hebrew + English)
- Creates normalized search strings
- Outputs `data/click_index.json`

**Usage:**
```bash
python scripts/build_index.py
```

#### `scripts/build_page_index.py` (Legacy)

Original OCR-based page matching tool. See `README_old.md` for details. Not required for website functionality.

## 🎨 Website Technology

- **Pure HTML5/CSS3/JavaScript** - No frameworks
- **ES6+ JavaScript** - Modern, clean code
- **Google Fonts** - Heebo & Rubik (Hebrew support)
- **CSS Grid & Flexbox** - Responsive layout
- **CSS Custom Properties** - Theming system
- **Archive.org Embed** - Iframe integration

### Key Features Implementation

**Real-time Search:**
- 300ms debounce for performance
- Searches both Hebrew and English names
- Normalized text matching
- Category filtering

**Responsive Design:**
- Mobile-first approach
- Breakpoints: 480px, 768px
- Touch-friendly UI
- Optimized fonts and spacing

## 🔧 Customization

### Adding Translations

Edit `scripts/build_index.py` and update dictionaries:

```python
GAME_TRANSLATIONS = {
    "משחק בעברית": "Game in English",
    # Add more...
}

ARTICLE_TRANSLATIONS = {
    "כתבה בעברית": "Article in English",
    # Add more...
}
```

Then rebuild:
```bash
python scripts/build_index.py
cp data/click_index.json docs/
```

### Styling Changes

Edit `docs/styles.css` - uses CSS custom properties:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    /* Modify colors here */
}
```

## 📝 License

Archive website and indexing code provided for historical preservation. Original magazine content © Click Magazine and respective publishers.

## 🔗 Links

- **Archive.org Collection**: https://archive.org/details/click_magazine
- **GitHub Pages**: (Configure in repository settings)

## 🙏 Credits

- Magazine scans courtesy of Archive.org
- Original index compiled from magazine content
- Website designed for the Click Magazine Archive project

---

**Created with ❤️ for gaming history preservation**

*Preserving Israeli gaming culture, one magazine at a time.*
