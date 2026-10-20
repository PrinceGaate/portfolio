# PRINCE.OS — Automatic Project Media Guide

PRINCE.OS includes an automatic, folder-based media management system. You can add project screenshots and screen recordings by dropping files into the corresponding project folder under `public/media/`.

---

## 1. Directory Structure

Place media inside `public/media/<project-slug>/`:

```text
public/
  media/
    paw-rescue/
      01-cover.webp
      02-homepage.webp
      10-dashboard.webp
      demo.mp4
      demo.poster.webp     (optional video poster)
    expense-tracker/
      01-cover.png
      02-analytics.png
    animal-injury/
      01-model-prediction.png
    contact-service/
      (empty if no media)
```

The folder name MUST match the project's `id` / `slug` defined in `src/screens/projects/ProjectsScreen.tsx`.

---

## 2. Supported File Formats

### Images
- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.avif`
- `.gif`

### Videos
- `.mp4`
- `.webm`

---

## 3. Natural Filename Ordering

Files are automatically ordered using **natural alphanumeric sorting**.
Prefix filenames with two-digit numbers to guarantee presentation order:

- `01-cover.webp`
- `02-homepage.webp`
- `03-feature.webp`
- `10-dashboard.webp`

Natural sorting ensures `02-homepage.webp` appears before `10-dashboard.webp`.

---

## 4. Video Posters & Thumbnails

To provide a custom thumbnail/poster for a video:
- Name the image with `.poster` or `-poster` matching the video's base name.
  - Example video: `demo.mp4`
  - Example poster: `demo.poster.png` or `demo.poster.webp`
- The system automatically assigns this poster to the video player and hides the poster file from appearing as a redundant separate image in the collage.

---

## 5. Local Previewing

1. Start the development server:
   ```bash
   npm run dev
   ```
2. When you add, rename, or remove files in `public/media/<project-slug>/`, the Vite plugin automatically regenerates the media manifest and updates the gallery via HMR without manual intervention.

---

## 6. Production Deployment

When building for production:
```bash
npm run build
```
The build process automatically runs `scripts/generate-media-manifest.mjs` before TypeScript compilation and Vite bundling (`prebuild` script), ensuring all assets are statically indexed into `dist/`.
