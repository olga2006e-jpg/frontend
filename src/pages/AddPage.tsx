import { Form, Button } from "react-bootstrap";
import BottomNav from "../components/BottomNav";

export default function AddPage() {
  return (
    <main className="phone app-page">
      <section className="page-content">
        <div className="page-card">
          <h1 className="page-card-title">Добавление</h1>

          {/* Используем Form как обертку, чтобы выполнить требование React-Bootstrap */}
          <Form 
            className="maintenance-form" 
            onSubmit={(e) => e.preventDefault()}
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            
            {/* Поле 1: Название транспорта */}
            <label className="field">
              <span>Название транспорта</span>
              <input 
                type="text" 
                name="title" 
                required 
                placeholder="Например: Фура" 
              />
            </label>

            {/* Поле 2: URL фото */}
            <label className="field">
              <span>URL фото</span>
              <input 
                type="text" 
                name="image_url" 
                placeholder="http://localhost:9000/medialab1/fura.png" 
              />
            </label>

            {/* Поле 3: URL видео */}
            <label className="field">
              <span>URL видео</span>
              <input 
                type="text" 
                name="video_url" 
                placeholder="http://localhost:9000/medialab1/fura.mp4" 
              />
            </label>

            {/* Кнопка "Далее" прижимается к низу благодаря marginTop: auto */}
            <Button 
              type="submit" 
              className="primary-button" 
              style={{ marginTop: "auto" }}
            >
              Далее
            </Button>
          </Form>
        </div>
      </section>
      <BottomNav />
    </main>
  );
}