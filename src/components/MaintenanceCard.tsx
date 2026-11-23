import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { MaintenanceDto } from "../types";
import { useAppSelector } from "../store/hooks";

const placeholderImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='150'%3E%3Crect width='300' height='150' fill='%23dce6ec'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236B7A99' font-size='14'%3EНет фото%3C/text%3E%3C/svg%3E";

interface Props {
  item: MaintenanceDto;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

export default function MaintenanceCard({ item, onDelete, isLoading }: Props) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((s) => s.user);

  const goToFeed = () => {
    navigate(`/feed?id=${item.id}`);
  };

  return (
    <div className="maintenance-card">
      <div className="card__img" onClick={goToFeed}>
        <img
          src={item.image_url || placeholderImg}
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholderImg;
          }}
          alt={item.title}
        />
      </div>
      
      <div className="card__info">
        <div className="card__text">
          <div className="card__title" onClick={goToFeed}>
            {item.title}
          </div>
          
          {/* ДОБАВИЛИ ОПИСАНИЕ КАТАЛОГА */}
          <div className="card__desc">
            {item.description}
          </div>

          <div className="card__divider" />
          
          <div className="card__likes">
            <span className="heart">♥</span> {item.likes}
          </div>
          <div className="card__metrics">
            <span><b>{item.speed_kmh}</b> км/ч</span>
            <span><b>{item.price_per_km}</b> ₽/км</span>
          </div>
        </div>

        {isAuthenticated && (
          <div className="card__actions">
            <Button className="delete-btn" onClick={() => onDelete(item.id)} disabled={isLoading}>
              Удалить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}