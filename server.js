// ===== AIVault Backend — server.js =====
// Free hosting: Render.com, Railway.app, Fly.io
// Deploy command: node server.js

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// ===== SIMPLE FILE-BASED DB (No external DB needed) =====
const DB_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

const DB = {
  subscribers: path.join(DB_DIR, 'subscribers.json'),
  clicks: path.join(DB_DIR, 'clicks.json'),
  events: path.join(DB_DIR, 'events.json'),
};

function readDB(file) {
  try {
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return [];
  }
}

function writeDB(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// ===== API ROUTES =====

// Newsletter subscription
app.post('/api/subscribe', (req, res) => {
  const { email, source } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const subscribers = readDB(DB.subscribers);
  const exists = subscribers.find(s => s.email === email);

  if (!exists) {
    subscribers.push({
      email,
      source: source || 'homepage',
      date: new Date().toISOString(),
      id: Date.now()
    });
    writeDB(DB.subscribers, subscribers);
    console.log(`✅ New subscriber: ${email}`);
  }

  res.json({ success: true, message: 'Subscribed successfully!' });
});

// Tool click tracking (for analytics)
app.post('/api/track', (req, res) => {
  const { event, tool, category } = req.body;
  const clicks = readDB(DB.clicks);
  clicks.push({
    event,
    tool,
    category,
    timestamp: new Date().toISOString(),
    ip: req.ip?.replace('::ffff:', '') || 'unknown'
  });
  writeDB(DB.clicks, clicks);
  res.json({ ok: true });
});

// Analytics dashboard (simple)
app.get('/api/stats', (req, res) => {
  // Basic auth protection
  const auth = req.headers.authorization;
  const ADMIN_KEY = process.env.ADMIN_KEY || 'changeme-admin-key';
  if (auth !== `Bearer ${ADMIN_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const subscribers = readDB(DB.subscribers);
  const clicks = readDB(DB.clicks);

  // Top clicked tools
  const toolClicks = {};
  clicks.filter(c => c.event === 'tool_click').forEach(c => {
    toolClicks[c.tool] = (toolClicks[c.tool] || 0) + 1;
  });
  const topTools = Object.entries(toolClicks)
    .sort(([,a],[,b]) => b - a)
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  res.json({
    subscribers: subscribers.length,
    totalClicks: clicks.length,
    topTools,
    recentSubscribers: subscribers.slice(-10).reverse(),
  });
});

// Sitemap XML (crucial for SEO)
app.get('/sitemap.xml', (req, res) => {
  const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
  const today = new Date().toISOString().split('T')[0];

  const pages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/blog.html', priority: '0.9', changefreq: 'daily' },
    { url: '/about.html', priority: '0.5', changefreq: 'monthly' },
    { url: '/advertise.html', priority: '0.6', changefreq: 'monthly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// robots.txt
app.get('/robots.txt', (req, res) => {
  const baseUrl = process.env.BASE_URL || 'https://yourdomain.com';
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /data/

Sitemap: ${baseUrl}/sitemap.xml`);
});

// Tool submit form
app.post('/api/submit-tool', (req, res) => {
  const { name, url, description, category, email } = req.body;
  if (!name || !url) return res.status(400).json({ error: 'Name and URL required' });

  const submissions = readDB(path.join(DB_DIR, 'submissions.json'));
  submissions.push({ name, url, description, category, email, date: new Date().toISOString() });
  writeDB(path.join(DB_DIR, 'submissions.json'), submissions);

  res.json({ success: true, message: 'Tool submitted for review!' });
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

// Catch-all: serve index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════╗
  ║   AIVault Server Running!         ║
  ║   http://localhost:${PORT}           ║
  ╚═══════════════════════════════════╝
  `);
});

module.exports = app;
