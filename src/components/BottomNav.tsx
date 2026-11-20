import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function BottomNav() {
  const items = [
    { to: "/feed", label: "Лента", icon: "◉", enabled: true },
    { to: "/add", label: "Добавление", icon: "▣", enabled: false },
    { to: "/catalog", label: "Транспорт", icon: "▱", enabled: true },
    { to: "/login", label: "Вход", icon: "➜", enabled: false },
  ];

  return (
    <Nav className="bottom-nav" as="nav">
      {items.map((item) =>
        item.enabled ? (
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
        )
      )}
    </Nav>
  );
}