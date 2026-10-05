export type TagInput =
  | number
  | string
  | { id: number }
  | { name: string; color_hex?: string }
  | { id: number; name: string; color_hex?: string };

export interface CreateTagInput {
  name: string;
  color_hex?: string;
}

export type UpdateTagInput = Partial<CreateTagInput>;

export interface CreateProjectInput {
  title: string;
  slug: string;
  summary?: string | null;
  description_markdown?: string | null;
  image_url?: string | null;
  github_urls?: string[] | null;
  live_url?: string | null;
  is_featured?: boolean;
  tags?: TagInput[];
}

export type UpdateProjectInput = Partial<CreateProjectInput>;

export interface CreateEducationInput {
  institution: string;
  degree: string;
  field_of_study?: string | null;
  start_date: string;
  end_date?: string | null;
  location?: string | null;
  grade?: string | null;
  description?: string | null;
}

export type UpdateEducationInput = Partial<CreateEducationInput>;

export interface CreateCertificateInput {
  name: string;
  organization: string;
  issue_date: string;
  certificate_url?: string | null;
  image_url?: string | null;
}

export type UpdateCertificateInput = Partial<CreateCertificateInput>;

export interface CreateExperienceInput {
  role: string;
  company: string;
  location?: string | null;
  employment_type?: string | null;
  start_date: string;
  end_date?: string | null;
  is_current?: boolean;
  description_markdown?: string | null;
}

export type UpdateExperienceInput = Partial<CreateExperienceInput>;

export interface CreateSkillInput {
  name: string;
  category: string;
  proficiency_level?: string;
}

export type UpdateSkillInput = Partial<CreateSkillInput>;