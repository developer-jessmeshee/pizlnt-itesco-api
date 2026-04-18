export interface CreateNoticeData {
  title: string;
  titleColor?: string;
  description: string;
  descriptionColor?: string;
  fechaExpiracion?: string | Date;
  mediaUrl?: string | null;
  user: string;
  career?: string;
}
