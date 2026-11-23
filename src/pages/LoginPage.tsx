import { useState, type FormEvent } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginSuccess, loginFailure } from "../slices/userSlice";
import BottomNav from "../components/BottomNav";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { error } = useAppSelector((s) => s.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/users/login",
        { username, password },
        { withCredentials: true }
      );
      const userLogin: string =
        response.data?.username ?? response.data?.login ?? username;
      dispatch(loginSuccess(userLogin));
      navigate("/catalog");
    } catch (err) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.message
          ? String(err.response.data.message)
          : "Неверный логин или пароль";
      dispatch(loginFailure(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-page">
      <section className="page-content page-content--center">
        <div className="page-card page-card--compact">
          <h1 className="page-card-title">Авторизация</h1>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form className="maintenance-form" onSubmit={handleSubmit}>
            <label className="field">
              <span>Логин</span>
              <input
                type="text"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Введите логин"
                disabled={loading}
              />
            </label>

            <label className="field">
              <span>Пароль</span>
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                disabled={loading}
              />
            </label>

            <Button type="submit" className="primary-button" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Войти"}
            </Button>
          </Form>
        </div>
      </section>
      <BottomNav />
    </main>
  );
}