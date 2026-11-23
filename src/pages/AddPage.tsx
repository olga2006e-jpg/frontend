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
  const [speedKmh, setSpeedKmh] = useState<string>("");
  const [pricePerKm, setPricePerKm] = useState<string>("");
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
        speed_kmh: Number(speedKmh),
        price_per_km: Number(pricePerKm),
        image: imageFile,
        video: videoFile,
      })
    );
    if (createMaintenance.fulfilled.match(result)) {
      navigate("/catalog");
    }
  };

  return (
    <main className="app-page">
      <section className="page-content page-content--center">
        <div className="page-card page-card--compact-form">
          <h1 className="page-card-title">Добавление</h1>

          <Form className="maintenance-form" onSubmit={handleSubmit}>
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
                rows={3}
              />
            </label>

            {/* Поле для фото без лишнего текста */}
            <div className="field">
              <span>Фото (файл для MinIO)</span>
              <label className="file-upload-wrapper" style={{ minHeight: 44 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={loading}
                  className="file-upload-input"
                />
                <span className="file-upload-name">
                  {imageFile ? imageFile.name : ""}
                </span>
              </label>
            </div>

            {/* Поле для видео без лишнего текста */}
            <div className="field">
              <span>Видео (файл для MinIO)</span>
              <label className="file-upload-wrapper" style={{ minHeight: 44 }}>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  disabled={loading}
                  className="file-upload-input"
                />
                <span className="file-upload-name">
                  {videoFile ? videoFile.name : ""}
                </span>
              </label>
            </div>

            <div className="field-row">
              <label className="field">
                <span>Скорость (км/ч)</span>
                <input
                  type="number"
                  required
                  min={0}
                  value={speedKmh}
                  onChange={(e) => setSpeedKmh(e.target.value)}
                  placeholder="Например: 60"
                  disabled={loading}
                />
              </label>

              <label className="field">
                <span>Тариф (₽/км)</span>
                <input
                  type="number"
                  required
                  min={0}
                  value={pricePerKm}
                  onChange={(e) => setPricePerKm(e.target.value)}
                  placeholder="Например: 100"
                  disabled={loading}
                />
              </label>
            </div>

            <Button type="submit" className="primary-button" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Добавить"}
            </Button>
          </Form>
        </div>
      </section>
      <BottomNav />
    </main>
  );
}
