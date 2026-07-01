export interface Skill {
  name: string;
  percentage: number;
  description: string;
}

export interface HackingSkill {
  name: string;
  status: "In Progress" | "Planned" | "Acquired";
  description: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  points: string[];
  badges: string[];
}

export interface Project {
  title: string;
  stack: string[];
  duration: string;
  description: string;
  tags: string[];
  githubUrl: string;
  accentColor: "cyan" | "purple";
  isLive?: boolean;
}

export interface Certification {
  title: string;
  program: string;
  issuer: string;
  year: string;
  url: string;
}

export interface Achievement {
  title: string;
  event: string;
  description: string;
  icon: string;
}
