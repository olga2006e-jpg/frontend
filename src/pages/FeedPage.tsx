import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 
import { MOCK_MAINTENANCES, MOCK_LIKED_IDS } from "../data/mock";
import BottomNav from "../components/BottomNav";
import placeholderImg from "../assets/placeholder.png";
import placeholderVid from "../assets/placeholder.mp4";

export default function FeedPage() {
  const [searchParams] = useSearchParams(); 
  const initialId = Number(searchParams.get("id")); 
  const initialIndex = initialId 
    ? MOCK_MAINTENANCES.findIndex((m) => m.id === initialId) 
    : 0;

  const [index, setIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
  const [expanded, setExpanded] = useState(false);
  const [likedIds, setLikedIds] = useState<number[]>(MOCK_LIKED_IDS);
  const [likesCount, setLikesCount] = useState(MOCK_MAINTENANCES.map((m) => m.likes));

  useEffect(() => {
    setExpanded(false);
  }, [index]);

  const current = MOCK_MAINTENANCES[index];
  const isLiked = likedIds.includes(current.id);

  const toggleLike = () => {
    setLikedIds((prev) =>
      prev.includes(current.id) ? prev.filter((id) => id !== current.id) : [...prev, current.id]
    );
    setLikesCount((prev) => {
      const copy = [...prev];
      copy[index] += isLiked ? -1 : 1;
      return copy;
    });
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
              onClick={toggleLike}
            >
              <span className="heart">♥</span>
              <span className="likes-count">{likesCount[index]}</span>
            </button>
            <button
              className="round-action next-button"
              onClick={() => setIndex((i) => (i + 1) % MOCK_MAINTENANCES.length)}
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