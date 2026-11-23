// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import FeedPage from "./pages/FeedPage";
// import CatalogPage from "./pages/CatalogPage";
// import AddPage from "./pages/AddPage";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Navigate to="/feed" replace />} />
//         <Route path="/feed" element={<FeedPage />} />
//         <Route path="/catalog" element={<CatalogPage />} />
//         <Route path="/add" element={<AddPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


import type { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import FeedPage from "./pages/FeedPage";
import CatalogPage from "./pages/CatalogPage";
import AddPage from "./pages/AddPage";
import LoginPage from "./pages/LoginPage";

function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAppSelector((s) => s.user);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
