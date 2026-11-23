import { useState, type ChangeEvent, type FormEvent } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createMaintenance } from "../slices/maintenancesSlice";

export default function AddPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((s) => s.maintenances);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [speedKmh, setSpeedKmh] = useState(60);
  const [pricePerKm, setPricePerKm] = useState(100);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] ?? null);
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVideoFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      createMaintenance({
        title,
        description,
        speed_kmh: speedKmh,
        price_per_km: pricePerKm,
        image: imageFile,
        video: videoFile,
      })
    );
    if (createMaintenance.fulfilled.match(result)) {
      navigate("/catalog");
    }
  };

  return (
    <main className="phone app-page">
      <section className="page-content">
        <div className="page-card">
          <h1 className="page-card-title">Добавление</h1>

          <Form
            className="maintenance-form"
            onSubmit={handleSubmit}
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <label className="field">
              <span>Название транспорта</span>
              <input
                type="text"
                required
                minLength={3}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: Фура"
                disabled={loading}
              />
            </label>

            <label className="field">
              <span>Описание</span>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание перевозки..."
                disabled={loading}
                style={{
                  height: 70,
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                  fontSize: 14,
                  resize: "none",
                }}
              />
            </label>

            <label className="field">
              <span>Фото (файл для MinIO)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={loading}
              />
            </label>

            <label className="field">
              <span>Видео (файл для MinIO)</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                disabled={loading}
              />
            </label>

            <div style={{ display: "flex", gap: 10 }}>
              <label className="field" style={{ flex: 1 }}>
                <span>Скорость (км/ч)</span>
                <input
                  type="number"
                  required
                  min={0}
                  value={speedKmh}
                  onChange={(e) => setSpeedKmh(Number(e.target.value))}
                  disabled={loading}
                />
              </label>

              <label className="field" style={{ flex: 1 }}>
                <span>Тариф (₽/км)</span>
                <input
                  type="number"
                  required
                  min={0}
                  value={pricePerKm}
                  onChange={(e) => setPricePerKm(Number(e.target.value))}
                  disabled={loading}
                />
              </label>
            </div>

            <Button
              type="submit"
              className="primary-button"
              style={{ marginTop: "auto" }}
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : "Добавить"}
            </Button>
          </Form>
        </div>
      </section>
      <BottomNav />
    </main>
  );
}
