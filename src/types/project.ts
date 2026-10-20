export interface ProjectLink {
  label: string;
  url: string;
}

export interface FlowchartNode {
  stage: string;
  label: string;
  detail: string;
  layer?: 'client' | 'preprocessing' | 'model' | 'decision' | 'backend' | 'storage' | 'external';
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

export interface ProjectData {
  id: string;
  name: string;
  type: string;
  status: string;
  description: string; // concise card description
  overview: string; // 2-4 sentences overview
  workflow: WorkflowStep[]; // 3-5 real workflow steps
  flowchart: FlowchartNode[]; // accurate architecture/inference nodes
  keyImplementation?: string;
  futureImprovements?: string;
  technologies: string[];
  links: ProjectLink[];
  images?: string[];
  // Legacy / backward-compatibility fields
  longDescription?: string;
  researchFocus?: {
    currentFocus: string;
    objectives: string[];
  };
}
