import { useState, useMemo } from "react";
import { MOCK_MAINTENANCES } from "../data/mock";
import type { MaintenanceDto } from "../types";
import MaintenanceCard from "../components/MaintenanceCard";
import TariffFilter from "../components/TariffFilter";
import BottomNav from "../components/BottomNav";

export default function CatalogPage() {
  const [items, setItems] = useState<MaintenanceDto[]>(MOCK_MAINTENANCES);
  const [draftFrom, setDraftFrom] = useState(0);
  const [draftTo, setDraftTo] = useState(1000);
  const [appliedFrom, setAppliedFrom] = useState(0);
  const [appliedTo, setAppliedTo] = useState(1000);

  const filtered = useMemo(
    () => items.filter((m) => m.price_per_km >= appliedFrom && m.price_per_km <= appliedTo),
    [items, appliedFrom, appliedTo]
  );

  const handleSearch = () => {
    setAppliedFrom(draftFrom);
    setAppliedTo(draftTo);
  };

  const handleDelete = (id: number) => setItems((prev) => prev.filter((m) => m.id !== id));

  return (
    <main className="phone app-page catalog-page">
      <section className="page-content">
        <div className="page-card">
          <h1 className="page-card-title">Выбор транспорта и фильтрация по тарифу</h1>

          <TariffFilter
            from={draftFrom}
            to={draftTo}
            onChangeFrom={setDraftFrom}
            onChangeTo={setDraftTo}
            onSubmit={handleSearch}
          />

          <div className="maintenance-grid">
            {filtered.map((item) => (
              <MaintenanceCard key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "#6B7A99", marginTop: "16px" }}>
              Ничего не найдено
            </p>
          )}
        </div>
      </section>
      <BottomNav />
    </main>
  );
}