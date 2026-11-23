// import { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom"; 
// import { MOCK_MAINTENANCES, MOCK_LIKED_IDS } from "../data/mock";
// import BottomNav from "../components/BottomNav";
// import placeholderImg from "../assets/placeholder.png";
// import placeholderVid from "../assets/placeholder.mp4";

// export default function FeedPage() {
//   const [searchParams] = useSearchParams(); 
//   const initialId = Number(searchParams.get("id")); 
//   const initialIndex = initialId 
//     ? MOCK_MAINTENANCES.findIndex((m) => m.id === initialId) 
//     : 0;

//   const [index, setIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
//   const [expanded, setExpanded] = useState(false);
//   const [likedIds, setLikedIds] = useState<number[]>(MOCK_LIKED_IDS);
//   const [likesCount, setLikesCount] = useState(MOCK_MAINTENANCES.map((m) => m.likes));

//   useEffect(() => {
//     setExpanded(false);
//   }, [index]);

//   const current = MOCK_MAINTENANCES[index];
//   const isLiked = likedIds.includes(current.id);

//   const toggleLike = () => {
//     setLikedIds((prev) =>
//       prev.includes(current.id) ? prev.filter((id) => id !== current.id) : [...prev, current.id]
//     );
//     setLikesCount((prev) => {
//       const copy = [...prev];
//       copy[index] += isLiked ? -1 : 1;
//       return copy;
//     });
//   };

//   return (
//     <main className="phone feed-page">
//       <section className="reels">
//         <article className="reel is-active">
//           <video
//             className="reel-video"
//             src={current.video_url || placeholderVid}
//             autoPlay
//             muted
//             loop
//             playsInline
//             poster={current.image_url || placeholderImg}
//           />
//           <div className="video-shade" />

//           <div className={`feed-copy ${expanded ? "is-expanded" : ""}`}>
//             <span className="brand">
//               <span className="brand-mark">★</span>
//               <span className="brand-name">Логистика.Про</span>
//             </span>
//             <h1>{current.title}</h1>
//             <p className="feed-description">{current.description}</p>
//             <button
//               className="toggle-description"
//               onClick={() => setExpanded((e) => !e)}
//             >
//               {expanded ? "Свернуть" : "Ещё"}
//             </button>
//           </div>

//           <aside className="feed-actions">
//             <button
//               className={`round-action like-button ${isLiked ? "is-liked" : ""}`}
//               onClick={toggleLike}
//             >
//               <span className="heart">♥</span>
//               <span className="likes-count">{likesCount[index]}</span>
//             </button>
//             <button
//               className="round-action next-button"
//               onClick={() => setIndex((i) => (i + 1) % MOCK_MAINTENANCES.length)}
//             >
//               <span>↓</span>
//             </button>
//             <div className="feed-stat">{current.speed_kmh} км/ч</div>
//             <div className="feed-stat">{current.price_per_km} ₽/км</div>
//           </aside>
//         </article>
//       </section>
//       <BottomNav />
//     </main>
//   );
// }


import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import BottomNav from "../components/BottomNav";
import placeholderImg from "../assets/placeholder.png";
import placeholderVid from "../assets/placeholder.mp4";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getMaintenancesList, toggleLikeMaintenance } from "../slices/maintenancesSlice";

export default function FeedPage() {
  const dispatch = useAppDispatch();
  const { items, loading, likedIds } = useAppSelector((s) => s.maintenances);
  const { isAuthenticated } = useAppSelector((s) => s.user);
  const [searchParams] = useSearchParams();

  const initialId = Number(searchParams.get("id"));
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(getMaintenancesList());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    if (initialId && items.length > 0) {
      const found = items.findIndex((m) => m.id === initialId);
      if (found >= 0) setIndex(found);
    }
  }, [initialId, items]);

  useEffect(() => {
    setExpanded(false);
  }, [index]);

  const safeIndex = items.length > 0 ? index % items.length : 0;
  const current = items[safeIndex];

  if (!current) {
    return (
      <main className="phone feed-page">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", color: "#fff" }}>
          {loading ? <Spinner animation="border" variant="light" /> : "Нет данных"}
        </div>
        <BottomNav />
      </main>
    );
  }

  const isLiked = isAuthenticated && likedIds.includes(current.id);

  const handleLike = () => {
    if (!isAuthenticated || loading) return;
    dispatch(toggleLikeMaintenance(current.id));
  };

  return (
    <main className="phone feed-page">
      <section className="reels">
        <article className="reel is-active">
          <video
            className="reel-video"
            src={current.video_url || placeholderVid}
            autoPlay
            muted
            loop
            playsInline
            poster={current.image_url || placeholderImg}
          />
          <div className="video-shade" />

          <div className={`feed-copy ${expanded ? "is-expanded" : ""}`}>
            <span className="brand">
              <span className="brand-mark">★</span>
              <span className="brand-name">Логистика.Про</span>
            </span>
            <h1>{current.title}</h1>
            <p className="feed-description">{current.description}</p>
            <button
              className="toggle-description"
              onClick={() => setExpanded((e) => !e)}
            >
              {expanded ? "Свернуть" : "Ещё"}
            </button>
          </div>

          <aside className="feed-actions">
            <button
              className={`round-action like-button ${isLiked ? "is-liked" : ""}`}
              onClick={handleLike}
              disabled={!isAuthenticated || loading}
              style={{ opacity: isAuthenticated ? 1 : 0.5 }}
            >
              <span className="heart">♥</span>
              <span className="likes-count">{current.likes}</span>
            </button>
            <button
              className="round-action next-button"
              onClick={() => setIndex((i) => (i + 1) % items.length)}
              disabled={loading}
            >
              <span>↓</span>
            </button>
            <div className="feed-stat">{current.speed_kmh} км/ч</div>
            <div className="feed-stat">{current.price_per_km} ₽/км</div>
          </aside>
        </article>
      </section>
      <BottomNav />
    </main>
  );
}
