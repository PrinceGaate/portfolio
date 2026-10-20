import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateMediaManifest } from './scripts/generate-media-manifest.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function projectMediaPlugin(): Plugin {
  return {
    name: 'project-media-manifest-plugin',
    buildStart() {
      generateMediaManifest();
    },
    configureServer(server) {
      generateMediaManifest();
      const mediaDir = path.resolve(__dirname, 'public/media');
      server.watcher.add(mediaDir);
      server.watcher.on('all', (_event, filePath) => {
        if (filePath.includes(path.sep + 'media' + path.sep) || filePath.endsWith(path.sep + 'media')) {
          generateMediaManifest();
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), projectMediaPlugin()],
});

