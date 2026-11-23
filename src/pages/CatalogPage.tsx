import { useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import MaintenanceCard from "../components/MaintenanceCard";
import TariffFilter from "../components/TariffFilter";
import BottomNav from "../components/BottomNav";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  getMaintenancesList,
  deleteMaintenance,
  setFilter,
} from "../slices/maintenancesSlice";

export default function CatalogPage() {
  const dispatch = useAppDispatch();
  const { items, filter, loading, error, isMockMode } = useAppSelector(
    (s) => s.maintenances
  );

  useEffect(() => {
    dispatch(getMaintenancesList());
  }, [dispatch]);

  const handleSearch = () => {
    if (!loading) {
      dispatch(getMaintenancesList());
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteMaintenance(id));
  };

  return (
    <main className="app-page catalog-page">
      <section className="page-content">
        <div className="page-card">
          <h1 className="page-card-title">
            Выбор транспорта и фильтрация по тарифу
          </h1>

          {isMockMode && (
            <Alert variant="info" className="mb-3" style={{ fontSize: 13 }}>
              Демо-режим: бэкенд недоступен, показаны локальные данные.
            </Alert>
          )}

          <TariffFilter
            from={filter.from}
            to={filter.to}
            onChangeFrom={(v) => dispatch(setFilter({ ...filter, from: v }))}
            onChangeTo={(v) => dispatch(setFilter({ ...filter, to: v }))}
            onSubmit={handleSearch}
          />

          {loading && (
            <div style={{ display: "flex", justifyContent: "center", padding: "16px" }}>
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {error && !loading && !isMockMode && (
            <p style={{ textAlign: "center", color: "var(--muted)", fontSize: "12px", marginBottom: "10px" }}>
              {error}
            </p>
          )}

          <div className="maintenance-grid">
            {items.map((item) => (
              <MaintenanceCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                isLoading={loading}
              />
            ))}
          </div>

          {!loading && items.length === 0 && (
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
