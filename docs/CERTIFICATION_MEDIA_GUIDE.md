# PRINCE.OS — Certification Media Management Guide

This guide explains how to store, optimize, and configure certificate images in PRINCE.OS without modifying React components.

---

## 1. Directory Structure

Certificate image assets are stored as static files in:
```text
public/
  media/
    certifications/
      ncacsit-2025/
        .gitkeep
        (upload certificate scan here)
      smart-india-hackathon-2025/
        .gitkeep
        (upload certificate scan here)
      ibm-skillsbuild/
        .gitkeep
        (upload certificate scans here)
```

Each achievement folder corresponds to the `id` field defined in `src/data/certificationsData.ts`.

---

## 2. Supported Formats & Optimization

### Supported Formats
- **Recommended**: `.webp` (best compression and crispness)
- **Supported**: `.png`, `.jpg`, `.jpeg`, `.avif`

### Optimization Guidelines
- **Resolution**: Width between 1200px and 1800px is ideal for full-screen zoom without performance degradation.
- **Aspect Ratio**: Standard landscape (A4 / Letter landscape) works best with the CRT viewport.
- **File Size**: Target < 500 KB per image. Avoid raw scanner outputs exceeding 5 MB.
- **Color Profile**: sRGB.

---

## 3. Registering Certificate Images

Configure entries in `src/data/certificationsData.ts`.

### A. Single-Image Certificate
For an achievement with a single certificate scan:
1. Copy your file to:
   `public/media/certifications/ncacsit-2025/certificate.webp`
2. Update `images` in `src/data/certificationsData.ts`:
   ```typescript
   {
     id: 'ncacsit-2025',
     title: 'NCACSIT–2025',
     issuer: 'National Conference on Advance Computer Science and Information Technology',
     description:
       'Presented the team paper “Technology-Driven Rescue and Welfare Systems for Stray Animals” at the National Conference on Advance Computer Science and Information Technology (NCACSIT–2025).',
     issueDate: '2025',
     images: ['/media/certifications/ncacsit-2025/certificate.webp'],
     imageAlts: ['NCACSIT–2025 Paper Presentation Certificate'],
   }
   ```
*Behavior: The image renders as the card preview. Clicking opens the zoomable modal. No pagination controls or counter are shown.*

---

### B. Multiple-Image Certificate (Front & Back or Multiple Credentials)
For an achievement with two or more scans (e.g. the two IBM SkillsBuild certifications or front/back documents):
1. Copy your files to:
   `public/media/certifications/ibm-skillsbuild/01-getting-started-enterprise-data-science.webp`
   `public/media/certifications/ibm-skillsbuild/02-enterprise-data-science.webp`
2. Update `images` in `src/data/certificationsData.ts`:
   ```typescript
   {
     id: 'ibm-skillsbuild',
     title: 'IBM SkillsBuild',
     issuer: 'IBM SkillsBuild',
     description:
       'Participated in an IBM SkillsBuild workshop conducted by IBM officials at the institute campus. Successfully completed the following certifications:\n- Getting Started with Enterprise Data Science\n- Enterprise Data Science',
     issueDate: '2025',
     images: [
       '/media/certifications/ibm-skillsbuild/01-getting-started-enterprise-data-science.webp',
       '/media/certifications/ibm-skillsbuild/02-enterprise-data-science.webp'
     ],
     imageAlts: [
       'IBM SkillsBuild: Getting Started with Enterprise Data Science',
       'IBM SkillsBuild: Enterprise Data Science'
     ],
   }
   ```
*Behavior:*
- The first image (`images[0]`) appears as the card preview.
- A badge (`2_ATTACHMENTS`) indicates multiple documents exist.
- In the modal, Previous (`< PREV`) and Next (`NEXT >`) buttons, keyboard navigation (`ArrowLeft` / `ArrowRight`), and an image counter `[ 01 / 02 ]` appear automatically.

---

### C. No Image Uploaded Yet (Neutral Placeholder)
If you have not uploaded a certificate scan yet, keep the `images` array empty:
```typescript
images: []
```
*Behavior: The card automatically renders a tasteful neutral terminal placeholder box showing the designated destination folder. It does not fabricate artwork or imply that a scan is verified.*

---

## 4. How to Add a New Achievement

1. Create a folder in `public/media/certifications/<new-id>/`.
2. Add your certificate image(s) to that folder.
3. Open `src/data/certificationsData.ts` and append your record:
   ```typescript
   {
     id: 'new-credential-id',
     title: 'Credential Title',
     issuer: 'Issuing Organization',
     description: 'Brief recruiter-friendly description of the accomplishment.',
     issueDate: '2026',
     images: ['/media/certifications/new-credential-id/certificate.webp'],
     imageAlts: ['Credential Title Certificate'],
   }
   ```
4. Save the file. The new card will render with identical dimensions, styling, and modal interaction without changing any React components.

---

## 5. Separation from Project Media

- **Project Media**: Resides in `public/media/<project-slug>/` and is indexed at build time by `scripts/generate-media-manifest.mjs`.
- **Certification Media**: Resides in `public/media/certifications/<id>/` and is referenced data-first via `src/data/certificationsData.ts`.
- The two systems operate independently to ensure fast builds and prevent schema coupling.
