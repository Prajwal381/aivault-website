// ===== AIVault Tool Data =====
// Add more tools here to grow your directory!

const CATEGORIES = [
  { id: "writing", name: "Writing & Content", emoji: "✍️", count: 85 },
  { id: "image", name: "Image Generation", emoji: "🎨", count: 72 },
  { id: "coding", name: "Coding & Dev", emoji: "💻", count: 68 },
  { id: "video", name: "Video & Animation", emoji: "🎬", count: 54 },
  { id: "audio", name: "Audio & Music", emoji: "🎵", count: 41 },
  { id: "productivity", name: "Productivity", emoji: "⚡", count: 63 },
  { id: "marketing", name: "Marketing & SEO", emoji: "📣", count: 49 },
  { id: "data", name: "Data & Analytics", emoji: "📊", count: 37 },
  { id: "chatbot", name: "Chatbots & LLMs", emoji: "🤖", count: 44 },
  { id: "design", name: "Design & UI", emoji: "🎭", count: 38 },
  { id: "research", name: "Research & Study", emoji: "🔬", count: 29 },
  { id: "business", name: "Business & Finance", emoji: "💼", count: 33 },
];

const TOOLS = [
  // === WRITING ===
  {
    id: 1, name: "ChatGPT", category: "chatbot", emoji: "🤖",
    desc: "The world's most popular AI assistant by OpenAI. Write, code, analyze, and more with the most capable LLM.",
    pricing: "freemium", stars: 4.9, trending: true,
    url: "https://chat.openai.com/?ref=aivault",
    affiliate: true, tags: ["writing", "coding", "chat"]
  },
  {
    id: 2, name: "Claude by Anthropic", category: "chatbot", emoji: "⬡",
    desc: "Anthropic's powerful AI assistant. Exceptional at long documents, analysis, coding, and nuanced reasoning.",
    pricing: "freemium", stars: 4.9, isNew: true,
    url: "https://claude.ai/?ref=aivault",
    affiliate: false, tags: ["writing", "coding", "analysis"]
  },
  {
    id: 3, name: "Jasper AI", category: "writing", emoji: "✍️",
    desc: "AI writing platform built for marketing teams. Create blog posts, ads, emails, and brand content at scale.",
    pricing: "paid", stars: 4.6, sponsored: true,
    url: "https://jasper.ai/?ref=aivault",
    affiliate: true, tags: ["marketing", "content", "blog"]
  },
  {
    id: 4, name: "Copy.ai", category: "writing", emoji: "📝",
    desc: "Generate marketing copy, sales emails, product descriptions, and social media content in seconds.",
    pricing: "freemium", stars: 4.5,
    url: "https://copy.ai/?ref=aivault",
    affiliate: true, tags: ["marketing", "copywriting"]
  },
  {
    id: 5, name: "Writesonic", category: "writing", emoji: "🖊️",
    desc: "AI writer and SEO tool. Create articles, landing pages, and social posts optimized for search engines.",
    pricing: "freemium", stars: 4.4,
    url: "https://writesonic.com/?ref=aivault",
    affiliate: true, tags: ["writing", "seo"]
  },
  {
    id: 6, name: "Grammarly", category: "writing", emoji: "🔍",
    desc: "AI-powered writing assistant that checks grammar, tone, and clarity. Works everywhere you write online.",
    pricing: "freemium", stars: 4.7,
    url: "https://grammarly.com/?ref=aivault",
    affiliate: true, tags: ["grammar", "editing"]
  },

  // === IMAGE ===
  {
    id: 7, name: "Midjourney", category: "image", emoji: "🎨",
    desc: "Create stunning AI art and images from text prompts. The gold standard for AI image generation quality.",
    pricing: "paid", stars: 4.8, trending: true,
    url: "https://midjourney.com/?ref=aivault",
    affiliate: false, tags: ["art", "creative", "design"]
  },
  {
    id: 8, name: "DALL-E 3", category: "image", emoji: "🖼️",
    desc: "OpenAI's latest image generator. Create photorealistic or artistic images with natural language prompts.",
    pricing: "freemium", stars: 4.7,
    url: "https://openai.com/dall-e-3/?ref=aivault",
    affiliate: false, tags: ["image", "art"]
  },
  {
    id: 9, name: "Stable Diffusion", category: "image", emoji: "🌊",
    desc: "Open-source AI image generation. Run locally or in the cloud. Highly customizable with thousands of models.",
    pricing: "free", stars: 4.6,
    url: "https://stability.ai/?ref=aivault",
    affiliate: false, tags: ["open source", "image"]
  },
  {
    id: 10, name: "Adobe Firefly", category: "image", emoji: "🔥",
    desc: "Adobe's AI image generator built for commercial use. Safe for business with no copyright concerns.",
    pricing: "freemium", stars: 4.5,
    url: "https://firefly.adobe.com/?ref=aivault",
    affiliate: true, tags: ["design", "commercial"]
  },
  {
    id: 11, name: "Canva AI", category: "design", emoji: "🎭",
    desc: "AI-powered design tools inside Canva. Generate images, remove backgrounds, and create content in minutes.",
    pricing: "freemium", stars: 4.7, trending: true,
    url: "https://canva.com/?ref=aivault",
    affiliate: true, tags: ["design", "marketing", "social"]
  },
  {
    id: 12, name: "Leonardo.ai", category: "image", emoji: "🎪",
    desc: "AI image generation for game assets and creative projects. Fine-tuned models for specific art styles.",
    pricing: "freemium", stars: 4.5, isNew: true,
    url: "https://leonardo.ai/?ref=aivault",
    affiliate: true, tags: ["gaming", "art", "assets"]
  },

  // === CODING ===
  {
    id: 13, name: "GitHub Copilot", category: "coding", emoji: "👨‍💻",
    desc: "AI pair programmer from GitHub and OpenAI. Get code suggestions, completions, and entire function bodies as you type.",
    pricing: "paid", stars: 4.8, trending: true,
    url: "https://copilot.github.com/?ref=aivault",
    affiliate: false, tags: ["coding", "ide", "vscode"]
  },
  {
    id: 14, name: "Cursor", category: "coding", emoji: "⚡",
    desc: "AI-first code editor built on VS Code. Chat with your codebase, auto-fix bugs, and write code with Claude/GPT.",
    pricing: "freemium", stars: 4.8, isNew: true, trending: true,
    url: "https://cursor.sh/?ref=aivault",
    affiliate: false, tags: ["ide", "coding", "ai editor"]
  },
  {
    id: 15, name: "Tabnine", category: "coding", emoji: "🔮",
    desc: "AI code completion that learns from your codebase. Works with all major IDEs. Privacy-focused with local mode.",
    pricing: "freemium", stars: 4.4,
    url: "https://tabnine.com/?ref=aivault",
    affiliate: true, tags: ["autocomplete", "coding"]
  },
  {
    id: 16, name: "Replit AI", category: "coding", emoji: "🔄",
    desc: "Build, run, and deploy apps with AI assistance in your browser. Great for beginners and prototyping.",
    pricing: "freemium", stars: 4.5,
    url: "https://replit.com/?ref=aivault",
    affiliate: true, tags: ["online ide", "deployment", "coding"]
  },

  // === VIDEO ===
  {
    id: 17, name: "Runway ML", category: "video", emoji: "🎬",
    desc: "AI video generation and editing. Create cinematic videos from text, images, or existing footage.",
    pricing: "freemium", stars: 4.7, trending: true,
    url: "https://runwayml.com/?ref=aivault",
    affiliate: true, tags: ["video", "generation", "editing"]
  },
  {
    id: 18, name: "Sora by OpenAI", category: "video", emoji: "🌟",
    desc: "OpenAI's text-to-video model. Create realistic and imaginative scenes from text descriptions up to 1 minute.",
    pricing: "paid", stars: 4.9, isNew: true, trending: true,
    url: "https://openai.com/sora/?ref=aivault",
    affiliate: false, tags: ["video generation", "text-to-video"]
  },
  {
    id: 19, name: "Synthesia", category: "video", emoji: "🎭",
    desc: "Create professional AI avatar videos. Perfect for training, onboarding, and corporate communications.",
    pricing: "paid", stars: 4.6,
    url: "https://synthesia.io/?ref=aivault",
    affiliate: true, tags: ["avatar", "corporate", "training"]
  },
  {
    id: 20, name: "HeyGen", category: "video", emoji: "🎤",
    desc: "AI video platform with realistic avatars. Translate videos to 40+ languages with perfect lip sync.",
    pricing: "freemium", stars: 4.6, isNew: true,
    url: "https://heygen.com/?ref=aivault",
    affiliate: true, tags: ["translation", "avatar", "video"]
  },

  // === AUDIO ===
  {
    id: 21, name: "ElevenLabs", category: "audio", emoji: "🔊",
    desc: "The most realistic AI voice generator. Clone voices, create audiobooks, and produce voiceovers in seconds.",
    pricing: "freemium", stars: 4.8, trending: true,
    url: "https://elevenlabs.io/?ref=aivault",
    affiliate: true, tags: ["voice", "tts", "audiobook"]
  },
  {
    id: 22, name: "Suno AI", category: "audio", emoji: "🎵",
    desc: "Create original songs from text prompts. Full songs with vocals, instrumentals, and lyrics in any genre.",
    pricing: "freemium", stars: 4.7, isNew: true, trending: true,
    url: "https://suno.ai/?ref=aivault",
    affiliate: false, tags: ["music", "generation", "songs"]
  },
  {
    id: 23, name: "Descript", category: "audio", emoji: "🎙️",
    desc: "Edit audio and video like a document. AI-powered transcription, overdub voices, and remove filler words.",
    pricing: "freemium", stars: 4.6,
    url: "https://descript.com/?ref=aivault",
    affiliate: true, tags: ["podcast", "editing", "transcription"]
  },

  // === PRODUCTIVITY ===
  {
    id: 24, name: "Notion AI", category: "productivity", emoji: "📓",
    desc: "AI writing and summarization built into Notion. Draft docs, summarize notes, and extract action items.",
    pricing: "freemium", stars: 4.6,
    url: "https://notion.so/product/ai/?ref=aivault",
    affiliate: true, tags: ["notes", "writing", "workspace"]
  },
  {
    id: 25, name: "Otter.ai", category: "productivity", emoji: "🦦",
    desc: "AI meeting assistant that records, transcribes, and summarizes meetings in real-time. Works with Zoom, Teams.",
    pricing: "freemium", stars: 4.5,
    url: "https://otter.ai/?ref=aivault",
    affiliate: true, tags: ["meetings", "transcription", "notes"]
  },
  {
    id: 26, name: "Perplexity AI", category: "research", emoji: "🔬",
    desc: "AI-powered search engine with real-time web access. Get cited answers with sources, not just links.",
    pricing: "freemium", stars: 4.7, trending: true,
    url: "https://perplexity.ai/?ref=aivault",
    affiliate: false, tags: ["search", "research", "web"]
  },

  // === MARKETING ===
  {
    id: 27, name: "Surfer SEO", category: "marketing", emoji: "🏄",
    desc: "AI-powered SEO content optimizer. Rank higher with data-driven content briefs and real-time scoring.",
    pricing: "paid", stars: 4.6,
    url: "https://surferseo.com/?ref=aivault",
    affiliate: true, tags: ["seo", "content", "ranking"]
  },
  {
    id: 28, name: "AdCreative.ai", category: "marketing", emoji: "📣",
    desc: "Generate high-converting ad creatives with AI. Outperform competitors with data-trained ad designs.",
    pricing: "paid", stars: 4.5,
    url: "https://adcreative.ai/?ref=aivault",
    affiliate: true, tags: ["ads", "creative", "marketing"]
  },

  // === DATA ===
  {
    id: 29, name: "Julius AI", category: "data", emoji: "📊",
    desc: "Chat with your data. Upload CSV or Excel and get instant charts, insights, and analysis in plain English.",
    pricing: "freemium", stars: 4.5, isNew: true,
    url: "https://julius.ai/?ref=aivault",
    affiliate: true, tags: ["data", "analysis", "csv"]
  },
  {
    id: 30, name: "MonkeyLearn", category: "data", emoji: "🐒",
    desc: "No-code machine learning for text analysis. Classify, extract, and analyze customer feedback at scale.",
    pricing: "freemium", stars: 4.3,
    url: "https://monkeylearn.com/?ref=aivault",
    affiliate: true, tags: ["nlp", "classification", "no-code"]
  },
];

const TRENDING_IDS = [1, 14, 7, 22, 17, 26];
