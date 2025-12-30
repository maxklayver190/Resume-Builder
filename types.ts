export type TemplateType = 'modern' | 'classic' | 'minimal';

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  photoUrl: string | null;
  summary: string;
}

export interface SectionItem {
  id: string;
  title?: string; // e.g. Company Name or School
  subtitle?: string; // e.g. Job Title or Degree
  date?: string; // e.g. 2020 - 2022
  description?: string; // Details
}

export interface Section {
  id: string;
  title: string;
  type: 'text' | 'list' | 'experience' | 'education' | 'skills';
  items: SectionItem[];
  isVisible: boolean;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  sections: Section[];
  template: TemplateType;
  primaryColor: string;
  contentScale: number;
}