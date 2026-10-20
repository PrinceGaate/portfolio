# PRINCE.OS — Developer Workflow: Project Media Management

This guide documents the folder-based media management system implemented in PRINCE.OS.

## Overview
Media assets for portfolio projects are automatically discovered at build time and during development without needing to edit source code or data arrays.

## 1. Where to Place Files
Assets live in:
`public/media/<project-slug>/`

Where `<project-slug>` matches the `id` of the project in `src/screens/projects/ProjectsScreen.tsx`:
- `paw-rescue`
- `expense-tracker`
- `animal-injury`
- `contact-service`

## 2. Supported Formats
- **Images**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`
- **Videos**: `.mp4`, `.webm`

## 3. Ordering
Filenames are sorted naturally (alphanumerically). To define display order, use numeric prefixes:
- `01-landing.webp`
- `02-details.webp`
- `10-settings.webp`

## 4. Video & Posters
For videos (e.g. `walkthrough.mp4`), add an optional poster image named `walkthrough.poster.webp` (or `.png`/`.jpg`). The system links it to the `<video>` element and keeps it from showing up as an independent photo item.

## 5. Local Development & Preview
Run `npm run dev`. When files are copied, modified, or deleted in `public/media`, the Vite plugin watches the directory, regenerates the manifest, and updates the UI automatically.

## 6. Production Builds
Run `npm run build`. The `prebuild` hook guarantees manifest compilation prior to TypeScript type checking (`tsc -b`) and Vite production packaging.
