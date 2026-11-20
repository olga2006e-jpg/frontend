export interface MaintenanceDto {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  video_url?: string;
  speed_kmh: number;
  price_per_km: number;
  likes: number;
}