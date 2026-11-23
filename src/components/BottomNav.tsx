// import { Nav } from "react-bootstrap";
// import { NavLink } from "react-router-dom";

// export default function BottomNav() {
//   const items = [
//     { to: "/feed", label: "Лента", icon: "◉", enabled: true },
//     { to: "/add", label: "Добавление", icon: "▣", enabled: false },
//     { to: "/catalog", label: "Транспорт", icon: "▱", enabled: true },
//     { to: "/login", label: "Вход", icon: "➜", enabled: false },
//   ];

//   return (
//     <Nav className="bottom-nav" as="nav">
//       {items.map((item) =>
//         item.enabled ? (
//           <Nav.Item key={item.to} className="flex-fill text-center">
//             <NavLink to={item.to} className="nav-item">
//               <span className="nav-icon">{item.icon}</span>
//               <small>{item.label}</small>
//             </NavLink>
//           </Nav.Item>
//         ) : (
//           <Nav.Item key={item.to} className="flex-fill text-center">
//             <span className="nav-item disabled">
//               <span className="nav-icon">{item.icon}</span>
//               <small>{item.label}</small>
//             </span>
//           </Nav.Item>
//         )
//       )}
//     </Nav>
//   );
// }


import { Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutSuccess } from "../slices/userSlice";
import { clearMaintenances, getMaintenancesList } from "../slices/maintenancesSlice";

export default function BottomNav() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((s) => s.user);

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout", {}, { withCredentials: true });
    } catch {
      // Локально завершаем сессию в Redux, даже если запрос вернул ошибку
    } finally {
      dispatch(logoutSuccess());
      dispatch(clearMaintenances());
      dispatch(getMaintenancesList());
      navigate("/login");
    }
  };

  const items = [
    { to: "/feed", label: "Лента", icon: "◉", enabled: true },
    { to: "/add", label: "Добавление", icon: "▣", enabled: isAuthenticated },
    { to: "/catalog", label: "Транспорт", icon: "▱", enabled: true },
    ...(isAuthenticated
      ? [{ to: "/login", label: "Выход", icon: "⎋", enabled: true, isLogout: true }]
      : [{ to: "/login", label: "Вход", icon: "➜", enabled: true, isLogout: false }]),
  ];

  return (
    <Nav className="bottom-nav" as="nav">
      {items.map((item) => {
        if (item.isLogout) {
          return (
            <Nav.Item key="logout" className="flex-fill text-center">
              <span
                className="nav-item"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                <span className="nav-icon">{item.icon}</span>
                <small>{item.label}</small>
              </span>
            </Nav.Item>
          );
        }

        return item.enabled ? (
          <Nav.Item key={item.to} className="flex-fill text-center">
            <NavLink to={item.to} className="nav-item">
              <span className="nav-icon">{item.icon}</span>
              <small>{item.label}</small>
            </NavLink>
          </Nav.Item>
        ) : (
          <Nav.Item key={item.to} className="flex-fill text-center">
            <span className="nav-item disabled">
              <span className="nav-icon">{item.icon}</span>
              <small>{item.label}</small>
            </span>
          </Nav.Item>
        );
      })}
    </Nav>
  );
}
