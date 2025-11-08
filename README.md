# Click Magazine Archive## Click Magazine Archive Index Enhancement



Complete digital archive of **Click** - Israel's premier gaming magazine from 2000-2001. This project provides a searchable index and beautiful web interface to explore all 10 issues.This project augments the original `data/click_index.xlsx` by adding page numbers for each indexed item across the 10 issues of the Israeli early-2000s gaming magazine "Click".



## 🎮 Project Overview### Goal

Generate `data/click_index_with_pages.xlsx` containing original rows plus:

**Click Magazine** was a comprehensive Israeli gaming magazine that covered:- `page`: Best-matching page (1-based)

- PC game reviews and previews- `match_score`: Fuzzy match confidence (RapidFuzz)

- Gaming hardware and gadgets- `alt_page` / `alt_score`: Second-best candidate (if useful for manual verification)

- Cheat codes and tips- `ocr_note`: Notes like `low-confidence`

- Articles about gaming culture and technology

- Kids games and educational software### Approach

1. PDF pages are converted to images (cached under `.cache/pages/`).

This archive preserves the complete collection with:2. OCR is performed with Tesseract (Hebrew + English) (cached under `.cache/ocr/`).

- ✅ All 10 PDF issues (stored locally)3. Text and item titles are normalized (lowercase, stripped punctuation, Hebrew RTL heuristics).

- ✅ Comprehensive searchable index (273 items)4. RapidFuzz scores item variants against every page.

- ✅ Modern web interface with Archive.org integration5. Results exported to a new Excel file (original not modified).

- ✅ Bilingual search (Hebrew & English)

- ✅ GitHub Pages deployment ready### Setup (macOS)

Install system dependencies first:

## 📁 Repository Structure

```bash

```brew install tesseract

click-archive/brew install poppler   # needed for pdf2image

├── data/```

│   ├── click_magazine_issues/     # All 10 PDF files (click-01.pdf to click-10.pdf)

│   ├── click_index.xlsx           # Original Excel indexOptional (for improved OCR on tough pages) you can also install EasyOCR (Torch), but it's not required for the baseline script:

│   └── click_index.json           # Generated searchable index

├── docs/                          # GitHub Pages website```bash

│   ├── index.html                 # Main pagepip install easyocr

│   ├── styles.css                 # Modern responsive styling```

│   ├── app.js                     # Search & viewer logic

│   ├── click_index.json           # Data for website### Python Environment

│   └── README.md                  # Website documentationInstall project dependencies (if not already in a virtual environment):

├── scripts/

│   ├── build_index.py             # Generate JSON from Excel ⭐ Main tool```bash

│   └── build_page_index.py        # OCR page matching (legacy)pip install -e .

├── pyproject.toml                 # Python dependencies```

└── README.md                      # This file

```Or individually (already listed in `pyproject.toml`):



## 🚀 Quick Start```bash

pip install pandas pdf2image Pillow pytesseract rapidfuzz unidecode openpyxl tqdm opencv-python-headless

### View the Website Locally```



```bash### Running the Script

cd docs

python -m http.server 8000```bash

# Visit http://localhost:8000python scripts/build_page_index.py            # process all issues

```python scripts/build_page_index.py --issue 1  # only issue 1 for quick test

python scripts/build_page_index.py --force    # rebuild caches (re-OCR)

### Building the Indexpython scripts/build_page_index.py --min-score 60  # adjust confidence threshold

python scripts/build_page_index.py --limit 50       # limit number of rows (dev)

If you need to rebuild the searchable JSON index:```



```bashThe enriched file will appear at `data/click_index_with_pages.xlsx`.

# Install dependencies

pip install -e .### Caching Details

- Page images: `.cache/pages/issueXX/page_YYY.jpg`

# Run the index builder- OCR text: `.cache/ocr/issueXX/page_YYY.txt`

python scripts/build_index.pyRe-run with `--force` to regenerate.



# Copy to docs folder### Hebrew OCR Notes

cp data/click_index.json docs/Hebrew right-to-left scanning can occasionally invert token order; the script creates variant forms of each item (normal + reversed tokens) to improve matching.

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
