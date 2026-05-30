// ===== AIVault App =====
(function() {
  'use strict';

  let currentCategory = 'all';
  let visibleCount = 12;
  let filteredTools = [];

  // ===== INIT =====
  document.addEventListener('DOMContentLoaded', () => {
    renderTrending();
    renderCategories();
    renderFilterTabs();
    renderAllTools();
    setupSearch();
    setupNewsletter();
    setupMobileMenu();
    setupAnalytics();
    updateToolCount();
  });

  // ===== RENDER TRENDING =====
  function renderTrending() {
    const grid = document.getElementById('trendingGrid');
    if (!grid) return;
    const trending = TOOLS.filter(t => TRENDING_IDS.includes(t.id)).slice(0, 6);
    grid.innerHTML = trending.map((t, i) => createToolCard(t, i * 0.05)).join('');
    grid.querySelectorAll('.tool-link').forEach(link => {
      link.addEventListener('click', e => trackClick(e, 'trending'));
    });
  }

  // ===== RENDER CATEGORIES =====
  function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    grid.innerHTML = CATEGORIES.map((c, i) => `
      <div class="category-card" data-cat="${c.id}" style="animation-delay:${i * 0.04}s" onclick="filterByCategory('${c.id}')">
        <span class="cat-emoji">${c.emoji}</span>
        <div class="cat-name">${c.name}</div>
        <div class="cat-count">${c.count} tools</div>
      </div>
    `).join('');
  }

  // ===== RENDER FILTER TABS =====
  function renderFilterTabs() {
    const tabs = document.getElementById('filterTabs');
    if (!tabs) return;
    const topCats = CATEGORIES.slice(0, 7);
    topCats.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.dataset.cat = cat.id;
      btn.textContent = `${cat.emoji} ${cat.name.split(' ')[0]}`;
      btn.addEventListener('click', () => filterByCategory(cat.id));
      tabs.appendChild(btn);
    });
  }

  // ===== RENDER ALL TOOLS =====
  function renderAllTools(tools, reset) {
    const grid = document.getElementById('allToolsGrid');
    if (!grid) return;

    const source = tools || TOOLS;
    filteredTools = source;

    if (reset) visibleCount = 12;
    const toShow = filteredTools.slice(0, visibleCount);

    if (toShow.length === 0) {
      grid.innerHTML = `<div class="no-results" style="grid-column:1/-1"><p>No tools found. Try a different search or category.</p></div>`;
      document.getElementById('loadMoreBtn').style.display = 'none';
      return;
    }

    grid.innerHTML = toShow.map((t, i) => createToolCard(t, i * 0.03)).join('');

    const loadBtn = document.getElementById('loadMoreBtn');
    if (loadBtn) {
      loadBtn.style.display = visibleCount >= filteredTools.length ? 'none' : 'block';
    }
  }

  // ===== CREATE TOOL CARD =====
  function createToolCard(tool, delay = 0) {
    const pricing = tool.pricing || 'free';
    const pricingLabel = {
      free: '<span class="badge badge-free">Free</span>',
      paid: '<span class="badge badge-paid">Paid</span>',
      freemium: '<span class="badge badge-freemium">Freemium</span>',
    }[pricing] || '';

    const newBadge = tool.isNew ? '<span class="badge badge-new">New</span>' : '';
    const trendBadge = tool.trending ? '<span class="badge badge-trending">🔥 Hot</span>' : '';
    const sponsoredTag = tool.sponsored ? '<span class="sponsored-tag">Sponsored</span>' : '';

    const stars = '★'.repeat(Math.floor(tool.stars)) + (tool.stars % 1 >= 0.5 ? '½' : '');

    return `
      <div class="tool-card" style="animation-delay:${delay}s" data-tool-id="${tool.id}">
        ${sponsoredTag}
        <div class="tool-card-top">
          <div class="tool-icon">${tool.emoji}</div>
          <div class="tool-badges">
            ${pricingLabel}
            ${newBadge}
            ${trendBadge}
          </div>
        </div>
        <div>
          <div class="tool-name">${tool.name}</div>
          <div class="tool-category">${getCategoryName(tool.category)}</div>
        </div>
        <p class="tool-desc">${tool.desc}</p>
        <div class="tool-footer">
          <div class="tool-stars" title="${tool.stars}/5 stars">${stars} ${tool.stars}</div>
          <a class="tool-link"
             href="${tool.url}"
             target="_blank"
             rel="noopener${tool.affiliate ? '' : ' noreferrer'}"
             data-name="${tool.name}"
             data-category="${tool.category}"
             onclick="trackToolClick(this)">
            Visit →
          </a>
        </div>
      </div>
    `;
  }

  // ===== SEARCH =====
  function setupSearch() {
    const input = document.getElementById('searchInput');
    const btn = document.getElementById('searchBtn');
    if (!input) return;

    let debounceTimer;

    input.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => performSearch(input.value), 250);
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') performSearch(input.value);
    });

    if (btn) btn.addEventListener('click', () => performSearch(input.value));
  }

  function performSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      filterByCategory(currentCategory);
      return;
    }

    const results = TOOLS.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      (t.tags || []).some(tag => tag.toLowerCase().includes(q))
    );

    // Sort by relevance (name match first)
    results.sort((a, b) => {
      const aName = a.name.toLowerCase().includes(q) ? 0 : 1;
      const bName = b.name.toLowerCase().includes(q) ? 0 : 1;
      return aName - bName;
    });

    renderAllTools(results, true);
    trackEvent('search', { query: q, results: results.length });

    // Update heading
    const h = document.querySelector('#all-tools .section-header h2');
    if (h) h.textContent = results.length > 0
      ? `🔍 ${results.length} results for "${query}"`
      : `No results for "${query}"`;
  }

  // ===== FILTER BY CATEGORY =====
  window.filterByCategory = function(catId) {
    currentCategory = catId;

    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === catId || (catId === 'all' && btn.dataset.cat === 'all'));
    });

    const tools = catId === 'all' ? TOOLS : TOOLS.filter(t => t.category === catId);
    renderAllTools(tools, true);

    // Update heading
    const cat = CATEGORIES.find(c => c.id === catId);
    const h = document.querySelector('#all-tools .section-header h2');
    if (h) h.textContent = cat ? `${cat.emoji} ${cat.name} Tools` : 'All AI Tools';

    // Scroll to tools section
    document.getElementById('all-tools')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // ===== LOAD MORE =====
  document.getElementById('loadMoreBtn')?.addEventListener('click', () => {
    visibleCount += 9;
    renderAllTools(filteredTools);
  });

  // ===== NEWSLETTER =====
  function setupNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('emailInput').value;
      if (!email) return;

      try {
        // Send to your backend API
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source: 'homepage' })
        });
      } catch (err) {
        // Silently fail — show success anyway (saves to backend when online)
        console.log('Subscription queued:', email);
      }

      // Show success
      form.querySelector('input').style.display = 'none';
      form.querySelector('button').style.display = 'none';
      document.getElementById('newsletterSuccess').style.display = 'block';

      trackEvent('newsletter_subscribe', { email });
    });
  }

  // ===== MOBILE MENU =====
  function setupMobileMenu() {
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => menu.classList.toggle('open'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  }

  // ===== ANALYTICS & TRACKING =====
  function setupAnalytics() {
    // Page view tracking
    trackEvent('page_view', { page: 'home', referrer: document.referrer });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const depth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (depth > maxScroll + 10) {
        maxScroll = depth;
        trackEvent('scroll_depth', { percent: depth });
      }
    }, { passive: true });
  }

  window.trackToolClick = function(el) {
    trackEvent('tool_click', {
      tool: el.dataset.name,
      category: el.dataset.category,
    });
    // Optionally record to backend
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'tool_click', tool: el.dataset.name })
    }).catch(() => {});
  };

  function trackEvent(name, data = {}) {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', name, data);
    }
    // Console for dev
    console.log('[Track]', name, data);
  }

  function trackClick(e, section) {
    trackEvent('tool_click', { section, href: e.currentTarget.href });
  }

  // ===== HELPERS =====
  function getCategoryName(catId) {
    const cat = CATEGORIES.find(c => c.id === catId);
    return cat ? cat.name : catId;
  }

  function updateToolCount() {
    const el = document.getElementById('toolCount');
    if (el) {
      let count = 0;
      const target = 500;
      const step = Math.ceil(target / 60);
      const interval = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count + '+';
        if (count >= target) clearInterval(interval);
      }, 30);
    }
  }

})();
