export interface Admin {
  _id?: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  techStack: string[];
  category: string; // Category ID
  liveDemoLink?: string;
  githubLink?: string;
  images: string[];
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Profile {
  _id?: string;
  githubLink?: string;
  linkedinLink?: string;
  twitterLink?: string;
  resumeLink?: string;
  contactEmail: string;
  bio?: string;
  name?: string;
  updatedAt?: Date;
}

export interface Qualification {
  _id?: string;
  title: string;
  issuer: string;
  issueDate: string; // YYYY-MM-DD format
  expiryDate?: string; // YYYY-MM-DD format (optional)
  credentialId?: string; // Certificate ID or verification code
  credentialUrl?: string; // Link to verify/view certificate
  certificateImage?: string; // URL to certificate image
  description?: string;
  type: 'education' | 'certification' | 'award'; // Type of qualification
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TechStack {
  _id?: string;
  name: string;
  category: 'frontend' | 'backend' | 'data-science' | 'devops' | 'mobile' | 'ui-ux' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsExperience?: number;
  description?: string;
  icon?: string; // e.g. devicon class, emoji, or short label
  isFeatured?: boolean;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthRequest extends Request {
  admin?: {
    id: string;
    username: string;
  };
}
