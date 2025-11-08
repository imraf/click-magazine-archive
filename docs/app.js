// Click Magazine Archive - Main Application
let magazineData = null;
let currentFilter = 'all';
let currentIssue = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', async () => {
    await loadMagazineData();
    initializeUI();
    renderIssuesGallery();
    setupEventListeners();
    setupScrollBehavior();
    initializeDarkMode();
});

// Dark Mode
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const toggleIcon = darkModeToggle.querySelector('.toggle-icon');
    
    // Check for saved preference or default to light mode
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleIcon.textContent = '☀️';
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent header click from triggering
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            toggleIcon.textContent = '☀️';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            toggleIcon.textContent = '🌙';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}

// Load magazine data from JSON
async function loadMagazineData() {
    try {
        const response = await fetch('click_index.json');
        magazineData = await response.json();
        console.log('Magazine data loaded:', magazineData.metadata);
    } catch (error) {
        console.error('Error loading magazine data:', error);
        alert('שגיאה בטעינת הנתונים | Error loading data');
    }
}

// Initialize UI elements
function initializeUI() {
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const backBtn = document.getElementById('backBtn');
    const closeResults = document.getElementById('closeResults');

    // Set up filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            performSearch(searchInput.value);
        });
    });

    // Set up back button
    backBtn.addEventListener('click', () => {
        showGallery();
    });

    // Set up close results button
    closeResults.addEventListener('click', () => {
        hideSearchResults();
        searchInput.value = '';
    });
}

// Set up event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    
    // Real-time search with debouncing
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        
        if (query.length === 0) {
            hideSearchResults();
            return;
        }

        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300); // 300ms debounce
    });

    // Clear search on Escape key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            hideSearchResults();
        }
    });
}

// Perform search
function performSearch(query) {
    if (!query || !magazineData) {
        hideSearchResults();
        return;
    }

    const normalizedQuery = normalizeSearchQuery(query);
    const results = [];

    // Search through all items
    magazineData.items.forEach(item => {
        // Apply category filter
        if (currentFilter !== 'all' && item.category !== currentFilter) {
            return;
        }

        // Search in normalized names (both Hebrew and English)
        const searchText = item.name_normalized.toLowerCase();
        if (searchText.includes(normalizedQuery)) {
            results.push(item);
        }
    });

    displaySearchResults(results, query);
}

// Normalize search query for better matching
function normalizeSearchQuery(query) {
    return query.toLowerCase().trim();
}

// Display search results
function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    const resultsCount = document.getElementById('resultsCount');
    const resultsList = document.getElementById('resultsList');

    if (results.length === 0) {
        resultsCount.textContent = `לא נמצאו תוצאות | No results found`;
        resultsList.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-secondary);">נסה חיפוש אחר | Try a different search</div>';
        searchResults.style.display = 'block';
        return;
    }

    resultsCount.textContent = `${results.length} תוצאות | ${results.length} results`;
    
    resultsList.innerHTML = results.map(item => `
        <div class="result-item" onclick="openIssueFromSearch(${item.issue})">
            <div class="result-title">
                <div>${item.name_hebrew}</div>
                ${item.name_english !== item.name_hebrew ? `<div style="font-weight: 400; font-size: 0.9rem; opacity: 0.8; margin-top: 0.25rem;">${item.name_english}</div>` : ''}
            </div>
            <div class="result-meta">
                <span class="result-badge">${getCategoryNameHebrew(item.category)}</span>
                <span>גיליון ${item.issue} | Issue ${item.issue}</span>
            </div>
        </div>
    `).join('');

    searchResults.style.display = 'block';
}

// Hide search results
function hideSearchResults() {
    const searchResults = document.getElementById('searchResults');
    searchResults.style.display = 'none';
}

// Get category name in Hebrew
function getCategoryNameHebrew(category) {
    const categories = {
        'game_review': 'ביקורת משחק',
        'article': 'כתבה',
        'gadget': 'גאדג\'ט',
        'cheatcode': 'קוד רמאות',
        'kids_game': 'משחק ילדים'
    };
    return categories[category] || category;
}

// Render issues gallery
function renderIssuesGallery() {
    if (!magazineData) return;

    const issuesGrid = document.getElementById('issuesGrid');
    
    issuesGrid.innerHTML = magazineData.issues.map(issue => {
        const itemCount = issue.items.length;
        const categoryBreakdown = getCategoryBreakdown(issue.items);
        const coverImg = `covers/cover-${String(issue.issue_number).padStart(2, '0')}.jpg`;
        
        // Get game reviews for this issue
        const gameReviews = issue.items
            .filter(item => item.category === 'game_review')
            .slice(0, 5); // Show first 5 games
        
        const hasMoreGames = issue.items.filter(item => item.category === 'game_review').length > 5;
        
        return `
            <div class="issue-card" onclick="openIssue(${issue.issue_number})">
                <div class="issue-cover">
                    <img src="${coverImg}" alt="Click Magazine Issue ${issue.issue_number}" class="issue-cover-img" loading="lazy">
                    <div class="issue-number">#${issue.issue_number}</div>
                </div>
                <div class="issue-info">
                    <h3 class="issue-title">גיליון ${issue.issue_number}</h3>
                    <div class="issue-stats">
                        <span>${itemCount} פריטים</span>
                        <span>|</span>
                        <span>${categoryBreakdown}</span>
                    </div>
                    ${gameReviews.length > 0 ? `
                        <div class="game-highlights">
                            <h4 class="highlights-title">🎮 סיקורים</h4>
                            <ul class="game-list">
                                ${gameReviews.map(game => `
                                    <li class="game-item">${game.name_english}</li>
                                `).join('')}
                                ${hasMoreGames ? '<li class="game-item more">+ עוד...</li>' : ''}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Get category breakdown for an issue
function getCategoryBreakdown(items) {
    const counts = {};
    items.forEach(item => {
        counts[item.category] = (counts[item.category] || 0) + 1;
    });
    
    const mainCategory = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])[0];
    
    return `${mainCategory[1]} ${getCategoryNameHebrew(mainCategory[0])}`;
}

// Open issue viewer
function openIssue(issueNumber) {
    const issue = magazineData.issues.find(i => i.issue_number === issueNumber);
    if (!issue) return;

    currentIssue = issue;

    // Update viewer
    document.getElementById('viewerTitle').textContent = `גיליון ${issueNumber} | Issue ${issueNumber}`;
    
    // Set Archive.org iframe
    const archiveViewer = document.getElementById('archiveViewer');
    archiveViewer.src = `${issue.archive_url}/mode/2up`;

    // Render issue contents
    renderIssueContents(issue);

    // Switch to viewer section
    showViewer();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Open issue from search results
function openIssueFromSearch(issueNumber) {
    hideSearchResults();
    document.getElementById('searchInput').value = '';
    openIssue(issueNumber);
}

// Render issue contents
function renderIssueContents(issue) {
    const contentsList = document.getElementById('contentsList');
    
    // Group items by category
    const itemsByCategory = {};
    issue.items.forEach(item => {
        if (!itemsByCategory[item.category_display]) {
            itemsByCategory[item.category_display] = [];
        }
        itemsByCategory[item.category_display].push(item);
    });

    // Render categories
    contentsList.innerHTML = Object.entries(itemsByCategory).map(([category, items]) => `
        <div class="content-category">
            <h4 class="category-title">${category} | ${getCategoryNameHebrew(items[0].category)}</h4>
            <div class="category-items">
                ${items.map(item => `
                    <div class="content-item">
                        <div>
                            <div class="item-name">${item.name_hebrew}</div>
                            ${item.name_english !== item.name_hebrew ? 
                                `<div class="item-name-alt">${item.name_english}</div>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// Show gallery section
function showGallery() {
    document.getElementById('gallerySection').style.display = 'block';
    document.getElementById('viewerSection').style.display = 'none';
    
    // Clear iframe to stop loading
    const archiveViewer = document.getElementById('archiveViewer');
    archiveViewer.src = '';
    
    currentIssue = null;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Return to gallery (used by header click)
function returnToGallery() {
    showGallery();
}

// Show viewer section
function showViewer() {
    document.getElementById('gallerySection').style.display = 'none';
    document.getElementById('viewerSection').style.display = 'block';
}

// Utility: Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Setup scroll behavior for header
function setupScrollBehavior() {
    const header = document.getElementById('mainHeader');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop === 0) {
            header.classList.remove('scrolled');
        } else {
            header.classList.add('scrolled');
        }
    }, { passive: true });
}

// Export functions to global scope for onclick handlers
window.openIssue = openIssue;
window.openIssueFromSearch = openIssueFromSearch;
window.returnToGallery = returnToGallery;
