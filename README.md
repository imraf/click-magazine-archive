<p align="center">
  <img src="click-logo.jpg" alt="Click Magazine Logo" width="400">
</p>

# Click Magazine Archive Website

Click Magazine was a short running high-quality gaming magazine in Israel. As far as I can tell, there have only ever been 10 issues. I've managed to find and scan these issues, as well as mapped the content and created an index, to make them easily searchable.

This is now presented to you as a modern website for browsing the Click magazine archive. Enjoy!


## Features

- 📚 **Magazine Gallery** - Browse all 10 issues with beautiful cover cards
- 🔍 **Real-time Search** - Search in both Hebrew and English as you type
- 🏷️ **Category Filters** - Filter by game reviews, articles, gadgets, cheat codes, and kids games
- 📖 **Archive.org Integration** - Read magazines directly using Archive.org's embedded viewer
- 🌐 **Bilingual Support** - Full support for Hebrew and English content
- ⚡ **Lightning Fast** - Static site with no backend dependencies
- 📱 **Responsive Design** - Works beautifully on mobile, tablet, and desktop

## Technology Stack

- Pure HTML5, CSS3, and JavaScript (ES6+)
- No frameworks or build tools required
- Google Fonts (Heebo & Rubik for Hebrew support)
- Archive.org embedded viewer

## Project Structure

```
docs/
├── index.html          # Main HTML page
├── styles.css          # All styles and responsive design
├── app.js              # Search, filtering, and viewer logic
└── click_index.json    # Magazine content index (273 items)
```

## Data Structure

The `click_index.json` contains:
- **Metadata**: Total issues, items, and categories
- **Issues**: All 10 issues with Archive.org URLs
- **Items**: 273 searchable items with:
  - Hebrew and English names
  - Category (game_review, article, gadget, cheatcode, kids_game)
  - Issue number and Archive.org links

## Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Using Python
cd docs
python -m http.server 8000

# Using Node.js
cd docs
npx serve

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then visit `http://localhost:8000` (or the port shown)

## Search Functionality

The search supports:
- **Hebrew text**: משחקים, כתבות, גאדג'טים
- **English text**: games, articles, gadgets
- **Game names**: Diablo 2, Deus Ex, The Sims
- **Partial matches**: Types "diab" finds "Diablo 2"
- **Real-time filtering**: Results update as you type
- **Category filters**: Filter by content type

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

The website code is provided as-is for archival purposes. Original magazine content © Click Magazine / respective publishers.
