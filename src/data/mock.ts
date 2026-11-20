import type { MaintenanceDto } from "../types";

export const MOCK_MAINTENANCES: MaintenanceDto[] = [
  {
    id: 1,
    title: "Фура",
    description: "Идеальна для больших грузов. Подходит для строительства, материалов, мебели и крупной техники.",
    image_url: "",
    video_url: "",
    speed_kmh: 60,
    price_per_km: 120,
    likes: 24,
  },
  {
    id: 2,
    title: "Малотоннажный грузовик",
    description: "Городская и межгородская перевозка небольших партий товаров и сборных грузов.",
    image_url: "",
    video_url: "",
    speed_kmh: 80,
    price_per_km: 90,
    likes: 18,
  },
  {
    id: 3,
    title: "Авиаперевозка",
    description: "Срочная доставка малогабаритных грузов на дальние расстояния. Минимальные сроки.",
    image_url: "",
    video_url: "",
    speed_kmh: 800,
    price_per_km: 500,
    likes: 31,
  },
  {
    id: 4,
    title: "Поезд",
    description: "Экономичная перевозка крупных партий товаров. Стабильный график и высокая надёжность.",
    image_url: "",
    video_url: "",
    speed_kmh: 100,
    price_per_km: 60,
    likes: 12,
  },
  {
    id: 5,
    title: "поезд",
    description: "Доставка документов и небольших посылок в пределах города. Бесплатно для клиентов.",
    image_url: "",
    video_url: "",
    speed_kmh: 5,
    price_per_km: 0,
    likes: 5,
  },
];

export const MOCK_LIKED_IDS = [1, 3];