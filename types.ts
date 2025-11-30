export type SectionId = 'ai-tool' | 'quote' | 'lineup';

export type ViewState = 'main' | SectionId;

export interface SectionData {
  id: SectionId;
  title: string;
  description: string;
  ctaText: string;
  gradient: string;
}
