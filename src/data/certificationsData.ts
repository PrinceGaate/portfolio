export interface CertificateItem {
  id: string;
  title: string;
  issuer?: string;
  description: string;
  issueDate?: string;
  /**
   * Array of static image paths located in `public/media/certifications/<id>/`.
   * - If empty ([]), the UI shows a tasteful neutral terminal placeholder.
   * - If 1 image, it is used for preview and displayed in the modal without pagination.
   * - If 2+ images, the first is used for preview and the modal allows cycling with previous/next controls and an image counter.
   */
  images: string[];
  /** Optional accessible alt text corresponding to each entry in `images` */
  imageAlts?: string[];
}

/**
 * PRINCE.OS — Centralized Certifications Configuration
 * 
 * Media assets reside in `public/media/certifications/<achievement-id>/`.
 * Refer to `docs/CERTIFICATION_MEDIA_GUIDE.md` for conventions and examples.
 */
export const certificationsData: CertificateItem[] = [
  // ── Achievement 1: NCACSIT–2025 ──
  {
    id: 'ncacsit-2025',
    title: 'NCACSIT–2025',
    issuer: 'National Conference on Advance Computer Science and Information Technology',
    description:
      'Presented the team paper “Technology-Driven Rescue and Welfare Systems for Stray Animals” at the National Conference on Advance Computer Science and Information Technology (NCACSIT–2025).',
    issueDate: '2025',
    images: ['/media/certifications/ncacsit-2025/NCACSIT-2025.jpeg'],
    imageAlts: ['NCACSIT–2025 Research Paper Presentation Certificate'],
  },

  // ── Achievement 2: Smart India Hackathon 2025 ──
  {
    id: 'smart-india-hackathon-2025',
    title: 'Smart India Hackathon 2025',
    issuer: 'Smart India Hackathon 2025 Initiative',
    description:
      'Participated in the internal hackathon held on 19 September 2025 at the institute campus as part of the Smart India Hackathon 2025 initiative.',
    issueDate: '19 September 2025',
    images: ['/media/certifications/smart-india-hackathon-2025/SIH-2025.jpeg'],
    imageAlts: ['Smart India Hackathon 2025 Campus Internal Hackathon Certificate'],
  },

  // ── Achievement 3: IBM SkillsBuild ──
  {
    id: 'ibm-skillsbuild',
    title: 'IBM SkillsBuild',
    issuer: 'IBM SkillsBuild',
    description:
      'Participated in an IBM SkillsBuild workshop conducted by IBM officials at the institute campus. Successfully completed the following certifications:\n- Getting Started with Enterprise Data Science\n- Enterprise Data Science',
    issueDate: '2025',
    images: [
      '/media/certifications/ibm-skillsbuild/Getting Started with Enterprise Data Science.jpeg',
      '/media/certifications/ibm-skillsbuild/Enterprise Data Science in Practice.jpeg',
    ],
    imageAlts: [
      'IBM SkillsBuild: Getting Started with Enterprise Data Science Certificate',
      'IBM SkillsBuild: Enterprise Data Science in Practice Certificate',
    ],
  },
];
