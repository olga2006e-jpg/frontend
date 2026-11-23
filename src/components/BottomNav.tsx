import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutSuccess } from "../slices/userSlice";
import { clearMaintenances, getMaintenancesList } from "../slices/maintenancesSlice";

export default function BottomNav() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((s) => s.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Закрываем меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout", {}, { withCredentials: true });
    } catch {
      // Локально завершаем сессию в Redux
    } finally {
      dispatch(logoutSuccess());
      dispatch(clearMaintenances());
      dispatch(getMaintenancesList());
      setIsMenuOpen(false);
      navigate("/login");
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  const links = [
    { to: "/feed", label: "Лента" },
    { to: "/add", label: "Добавление", hidden: !isAuthenticated },
    { to: "/catalog", label: "Транспорт" },
  ];

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        {/* Десктопные ссылки */}
        <div className="nav__links">
          {links.map(
            (link) =>
              !link.hidden && (
                <NavLink key={link.to} to={link.to} className="nav__link">
                  {link.label}
                </NavLink>
              )
          )}
        </div>

        {/* Кнопка Вход/Выход (справа) */}
        <div className="nav__auth">
          {isAuthenticated ? (
            <button type="button" className="nav__link nav__link--auth" onClick={handleLogout}>
              Выход
            </button>
          ) : (
            <NavLink to="/login" className="nav__link nav__link--auth">
              Вход
            </NavLink>
          )}
        </div>

        {/* Мобильный бургер */}
        <div
          className={`nav__mobile-wrapper ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          ref={menuRef}
        >
          <div className="nav__mobile-target" />
          <div className="nav__mobile-menu" onClick={(e) => e.stopPropagation()}>
            {links.map(
              (link) =>
                !link.hidden && (
                  <NavLink key={link.to} to={link.to} className="nav__link" onClick={closeMenu}>
                    {link.label}
                  </NavLink>
                )
            )}
            {isAuthenticated ? (
              <button
                type="button"
                className="nav__link nav__link--auth"
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
              >
                Выход
              </button>
            ) : (
              <NavLink to="/login" className="nav__link nav__link--auth" onClick={closeMenu}>
                Вход
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}