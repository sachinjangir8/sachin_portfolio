import { ObjectId } from "mongodb";

export interface Admin {
  _id?: ObjectId;
  username: string;
  password: string;
  email?: string;
  resetOtp?: string;
  resetOtpExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Category {
  _id?: ObjectId;
  name: string;
  slug: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Project {
  _id?: ObjectId;
  title: string;
  description: string;
  techStack: string[];
  category: ObjectId | string;   // Mongo stores ObjectId, frontend can use string
  liveDemoLink?: string;
  githubLink?: string;
  images: string[];
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Profile {
  _id?: ObjectId;
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
  _id?: ObjectId;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: string;
  description?: string;
  type: 'education' | 'certification' | 'award';
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TechStack {
  _id?: ObjectId;
  name: string;
  category: 'frontend' | 'backend' | 'data-science' | 'devops' | 'mobile' | 'ui-ux' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsExperience?: number;
  description?: string;
  icon?: string;
  isFeatured?: boolean;
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
