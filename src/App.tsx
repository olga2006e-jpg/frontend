import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import CatalogPage from "./pages/CatalogPage";
import AddPage from "./pages/AddPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/add" element={<AddPage />} />
      </Routes>
    </BrowserRouter>
  );
}