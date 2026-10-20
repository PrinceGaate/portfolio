import type { ProjectData } from '../types/project';

export const projectsData: ProjectData[] = [
  // =========================================================================
  // 1. ANIMAL INJURY DETECTOR
  // =========================================================================
  {
    id: 'animal-injury',
    name: 'Animal Injury Detection',
    type: 'MACHINE LEARNING',
    status: 'COMPLETED',
    description: 'A deep learning image classification pipeline using ResNet-18 and class-weighted BCE to triage stray animals with visible physical injuries.',
    overview: 'An automated computer vision screening pipeline designed to assist animal rescue coordinators in prioritizing urgent veterinary triage. Built with PyTorch and torchvision, the system screens photos of stray animals to detect visible physical injuries such as open lacerations, lesions, and trauma. It prioritizes high sensitivity on the minority injured class to ensure wounded animals receive immediate care.',
    workflow: [
      {
        step: 1,
        title: 'Image Input & Validation',
        description: 'Accepts raw animal photographs via CLI or script, verifies valid image format via PIL, and converts image channels to standardized 3-channel RGB.'
      },
      {
        step: 2,
        title: 'Deterministic Preprocessing',
        description: 'Resizes inputs to 224×224 pixels and applies ImageNet mean and standard deviation normalization transforms.'
      },
      {
        step: 3,
        title: 'ResNet-18 Feature Extraction',
        description: 'Passes image tensors through an ImageNet-pretrained ResNet-18 residual backbone, pooling spatial features into a 512-dimensional embedding.'
      },
      {
        step: 4,
        title: 'Calibrated Inference',
        description: 'Projects embeddings through a dropout-regularized linear head to a scalar logit, computes Sigmoid probability, and evaluates against a validation-tuned threshold (τ* = 0.7300).'
      },
      {
        step: 5,
        title: 'Triage Output',
        description: 'Outputs prediction label (INJURED vs HEALTHY), estimated probability score, and an explicit veterinary decision-support disclaimer.'
      }
    ],
    flowchart: [
      {
        stage: '01',
        label: 'Field Photo Input',
        detail: 'Raw image file (JPG / PNG)',
        layer: 'client'
      },
      {
        stage: '02',
        label: 'Format & RGB Check',
        detail: 'PIL verification & RGB conversion',
        layer: 'preprocessing'
      },
      {
        stage: '03',
        label: 'Tensor Transforms',
        detail: 'Resize 224×224 & Normalize',
        layer: 'preprocessing'
      },
      {
        stage: '04',
        label: 'ResNet-18 Backbone',
        detail: 'Extracts 512-d residual features',
        layer: 'model'
      },
      {
        stage: '05',
        label: 'Linear Head & Sigmoid',
        detail: 'Dropout (p=0.2) + Linear(512→1)',
        layer: 'model'
      },
      {
        stage: '06',
        label: 'Calibrated Cutoff (τ*=0.73)',
        detail: 'P(injured) ≥ 0.7300 threshold check',
        layer: 'decision'
      },
      {
        stage: '07',
        label: 'Triage Prediction',
        detail: 'INJURED / HEALTHY + Disclaimer',
        layer: 'client'
      }
    ],
    keyImplementation: 'Trained using custom weighted binary cross-entropy (pos_weight ≈ 6.01) to penalize false negatives 6x more than false alarms. The dataset was partitioned into strictly group-disjoint splits to eliminate geometric augmentation leakage, achieving 97.74% accuracy and 88.89% injured recall on 133 held-out test images.',
    futureImprovements: 'Planned spatial bounding-box localization (YOLOv8) to outline specific wound coordinates on animal bodies.',
    technologies: ['Python', 'PyTorch', 'ResNet18', 'torchvision', 'Weighted BCE', 'Grouped Evaluation'],
    links: [
      { label: 'GitHub', url: 'https://github.com/PrinceGaate/animal-injury-detector' }
    ]
  },

  // =========================================================================
  // 2. CINEMATCH
  // =========================================================================
  {
    id: 'cinematch',
    name: 'CineMatch',
    type: 'FULL-STACK ML APPLICATION',
    status: 'COMPLETED',
    description: 'An ML-powered movie recommendation platform combining a React 19 frontend with a Python Flask REST API and precomputed cosine similarity.',
    overview: 'A modern full-stack movie discovery platform combining a cinematic React 19 single-page application with a Python Flask REST API. It uses content-based vector cosine similarity computed from the TMDB 5000 movie dataset (4,803 films) to generate personalized recommendations without ad tracking or paywalls.',
    workflow: [
      {
        step: 1,
        title: 'Title Selection or Mood Exploration',
        description: 'User enters a search query with debounced autocomplete or explores films through an interactive mood-to-genre matrix in the React UI.'
      },
      {
        step: 2,
        title: 'Flask API Request',
        description: 'React client sends an HTTP GET request to the Flask backend endpoint /api/recommend/<id> with pagination offset and limit parameters.'
      },
      {
        step: 3,
        title: 'In-Memory Cosine Similarity Lookup',
        description: 'Backend performs an O(1) dictionary lookup into precomputed recommendations.json, retrieving the top-20 nearest neighbor IDs in under 5ms.'
      },
      {
        step: 4,
        title: 'Metadata & Poster Resolution',
        description: 'Slices IDs by offset and retrieves movie metadata from memory, checking the local poster cache or proxying the external TMDB CDN API.'
      },
      {
        step: 5,
        title: 'Carousel Presentation',
        description: 'Returns JSON response with pagination headers; the frontend renders responsive recommendation cards with infinite wrap-around browsing.'
      }
    ],
    flowchart: [
      {
        stage: '01',
        label: 'User Movie Selection',
        detail: 'React 19 search / mood matrix',
        layer: 'client'
      },
      {
        stage: '02',
        label: 'Flask REST Endpoint',
        detail: 'GET /api/recommend/<id>',
        layer: 'backend'
      },
      {
        stage: '03',
        label: 'In-Memory Similarity',
        detail: 'O(1) lookup in recommendations.json',
        layer: 'storage'
      },
      {
        stage: '04',
        label: 'Offset Pagination',
        detail: 'Top-20 neighbor slice & wrap-around',
        layer: 'backend'
      },
      {
        stage: '05',
        label: 'Poster Cache & TMDB CDN',
        detail: 'Local cache check & TMDB API proxy',
        layer: 'external'
      },
      {
        stage: '06',
        label: 'Recommendation Results',
        detail: 'React carousel with posters & info',
        layer: 'client'
      }
    ],
    keyImplementation: 'Pairwise cosine similarity was compiled offline into lightweight JSON artifacts (movie_catalog.json and recommendations.json), allowing the Flask backend on Render to serve queries in under 5ms with <50MB RAM. The application is thoroughly covered by a 91-assertion automated test suite in backend/test_api.py.',
    futureImprovements: 'Automated weekly TMDB catalog sync and streaming platform availability badges (Netflix, Prime, Disney+).',
    technologies: ['React 19', 'Vite', 'Python', 'Flask', 'REST API', 'Cosine Similarity', 'TMDB API', 'Vercel', 'Render'],
    links: [
      { label: 'Deployment', url: 'https://cinematch-gamma-tan.vercel.app/' },
      { label: 'GitHub', url: 'https://github.com/PrinceGaate/cinematch' }
    ]
  },

  // =========================================================================
  // 3. PAWRESCUE
  // =========================================================================
  {
    id: 'paw-rescue',
    name: 'PawRescue',
    type: 'ANIMAL RESCUE RESEARCH & PROTOTYPE',
    status: 'ACTIVE',
    description: 'An evolving research initiative and interactive frontend prototype exploring how computer vision and workflow tooling can support animal injury reporting and rescue coordination.',
    overview: 'An evolving research initiative exploring how structured intake workflows can assist animal rescue operations. Built with React and Vite, it allows citizens to report injured stray animals with instant photo previews and follow simulated milestone progress. The current version serves as a client-side prototype to evaluate reporting ergonomics and volunteer coordination workflows.',
    workflow: [
      {
        step: 1,
        title: 'Open Report Form',
        description: 'Citizen encounters an injured stray animal and initiates the 3-step reporting wizard on the mobile-first web app.'
      },
      {
        step: 2,
        title: 'Select Photo & Add Details',
        description: 'Attaches an optional photograph validated (<10MB) with an instant client-side preview, selects species, and marks visible injury symptoms.'
      },
      {
        step: 3,
        title: 'Specify Location',
        description: 'Inputs street landmarks or requests device coordinates via the browser Geolocation API to place an approximate map pin.'
      },
      {
        step: 4,
        title: 'Client-Side Validation & Storage',
        description: 'Validates required form fields and persists the structured demonstration report directly into browser localStorage with a unique reference ID.'
      },
      {
        step: 5,
        title: 'Demonstration Tracking Timeline',
        description: 'Navigates to the tracking dashboard to view simulated milestone progression (Report Logged → Volunteer Assigned → In Transit → Complete).'
      }
    ],
    flowchart: [
      {
        stage: '01',
        label: 'Open Report Form',
        detail: 'Citizen intake wizard',
        layer: 'client'
      },
      {
        stage: '02',
        label: 'Photo Preview & Details',
        detail: 'FileReader preview + symptoms',
        layer: 'client'
      },
      {
        stage: '03',
        label: 'Specify Location',
        detail: 'Street landmark or GPS pin',
        layer: 'client'
      },
      {
        stage: '04',
        label: 'Client Validation',
        detail: 'Required field verification',
        layer: 'decision'
      },
      {
        stage: '05',
        label: 'Save Demo Report',
        detail: 'Browser localStorage persistence',
        layer: 'storage'
      },
      {
        stage: '06',
        label: 'Simulated Tracking',
        detail: 'Milestone progression timeline',
        layer: 'client'
      }
    ],
    keyImplementation: 'Engineered as a responsive single-page application using React 19 and Tailwind CSS. The prototype manages client-side form validation, base64 image preview encoding, and simulated state transitions in browser localStorage without requiring live server or database dependencies.',
    futureImprovements: 'Planned integration with the Animal Injury Detector computer vision model and real-time WebSocket volunteer dispatching.',
    technologies: ['React 19', 'Vite', 'Tailwind CSS', 'TypeScript', 'Client-Side Prototype', 'Local Demonstration Storage'],
    links: [
      { label: 'GitHub', url: 'https://github.com/PrinceGaate/PawRescue' }
    ]
  }
];
