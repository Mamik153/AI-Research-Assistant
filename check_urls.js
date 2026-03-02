const urls = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  "https://cdn.worldvectorlogo.com/logos/fastapi-1.svg",
  "https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/supabase-logo-icon.svg",
  "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
  "https://github.com/ollama/ollama/actions/workflows/test.yml/badge.svg", 
  "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
  "https://cdn.worldvectorlogo.com/logos/claude-ai-1.svg",
  "https://pageindex.ai/static/images/logo.png"
];

setTimeout(async () => {
    for (const u of urls) {
        try {
            const res = await fetch(u);
            console.log(res.status, u);
        } catch(e) { console.log(e.message, u) }
    }
}, 0);
