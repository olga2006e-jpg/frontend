// import { Card, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import type { MaintenanceDto } from "../types";
// import placeholderImg from "../assets/placeholder.png";

// interface Props {
//   item: MaintenanceDto;
//   onDelete: (id: number) => void;
// }

// export default function MaintenanceCard({ item, onDelete }: Props) {
//   const navigate = useNavigate();

//   const goToFeed = () => {
//     // Переходим на ленту с параметром id выбранной карточки
//     navigate(`/feed?id=${item.id}`);
//   };

//   return (
//     <Card 
//       className="maintenance-card" 
//       style={{ width: "100%", display: "flex", flexDirection: "column", border: "none", overflow: "hidden" }}
//     >
//       <Card.Img
//         variant="top"
//         src={item.image_url || placeholderImg}
//         onError={(e) => {
//           (e.target as HTMLImageElement).src = placeholderImg;
//         }}
//         onClick={goToFeed} 
//         style={{ cursor: "pointer", height: "90px", objectFit: "cover", width: "100%" }}
//       />
//       <Card.Body className="card-body" style={{ padding: "8px", display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 auto" }}>
//         <div className="title-row" onClick={goToFeed} style={{ cursor: "pointer" }}> {/* <-- Вызов перехода */}
//           <h2>{item.title}</h2>
//         </div>
//         <div className="title-divider"></div>
//         <div className="likes-row">
//           <span className="heart">♥</span>
//           <span>{item.likes}</span>
//         </div>
//         <div className="metrics">
//           <span><b>{item.speed_kmh} км/ч</b></span>
//           <span><b>{item.price_per_km} руб/км</b></span>
//         </div>
//         <div className="card-actions" style={{ marginTop: "auto" }}>
//           <Button className="delete-btn" onClick={() => onDelete(item.id)}>
//             Удалить
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// }


import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { MaintenanceDto } from "../types";
import placeholderImg from "../assets/placeholder.png";
import { useAppSelector } from "../store/hooks";

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
    <Card
      className="maintenance-card"
      style={{ width: "100%", display: "flex", flexDirection: "column", border: "none", overflow: "hidden" }}
    >
      <Card.Img
        variant="top"
        src={item.image_url || placeholderImg}
        onError={(e) => {
          (e.target as HTMLImageElement).src = placeholderImg;
        }}
        onClick={goToFeed}
        style={{ cursor: "pointer", height: "90px", objectFit: "cover", width: "100%" }}
      />
      <Card.Body className="card-body" style={{ padding: "8px", display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 auto" }}>
        <div className="title-row" onClick={goToFeed} style={{ cursor: "pointer" }}>
          <h2>{item.title}</h2>
        </div>
        <div className="title-divider"></div>
        <div className="likes-row">
          <span className="heart">♥</span>
          <span>{item.likes}</span>
        </div>
        <div className="metrics">
          <span><b>{item.speed_kmh} км/ч</b></span>
          <span><b>{item.price_per_km} руб/км</b></span>
        </div>
        {isAuthenticated && (
          <div className="card-actions" style={{ marginTop: "auto" }}>
            <Button
              className="delete-btn"
              onClick={() => onDelete(item.id)}
              disabled={isLoading}
            >
              Удалить
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
