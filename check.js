const urls = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  "https://cdn.worldvectorlogo.com/logos/fastapi-1.svg",
  "https://cdn.worldvectorlogo.com/logos/supabase.svg",
  "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
  "https://avatars.githubusercontent.com/u/132148733?s=200&v=4",
  "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/41/Anthropic_logo.svg"
];
Promise.all(urls.map(u => fetch(u).then(r => console.log(r.status, u)).catch(e => console.log(e.message, u))));
