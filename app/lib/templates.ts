export const templates = {
  react: {
    'package.json': `{
  "name": "react-app",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "start": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}`,
    'index.html': `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
    'src/main.jsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);`,
    'src/App.jsx': `export default function App() {
  return <h1>Hello React!</h1>;
}
`,
  },
  vue: {
    'package.json': `{
  "name": "vue-app",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "start": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}`,
    'index.html': `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Vue App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`,
    'src/main.js': `import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');`,
    'src/App.vue': `<script setup>
</script>

<template>
  <h1>Hello Vue!</h1>
</template>
`,
  },
  express: {
    'package.json': `{
  "name": "express-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}`,
    'index.js': `import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(port, () => {
  console.log('Server running on http://localhost:' + port);
});
`,
  },
} as const;

import { webcontainer } from '~/lib/webcontainer';
import { WORK_DIR } from '~/utils/constants';
import path from 'node:path';

export async function scaffoldTemplate(name: keyof typeof templates) {
  const files = templates[name];
  const wc = await webcontainer;

  for (const [filePath, content] of Object.entries(files)) {
    const absPath = path.join(WORK_DIR, filePath);
    const dir = path.dirname(absPath);
    await wc.fs.mkdir(dir, { recursive: true });
    await wc.fs.writeFile(absPath, content);
  }
}
