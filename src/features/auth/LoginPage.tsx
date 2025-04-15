import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  loginThunk,
  selectIsAuthorized,
  selectAuthLoading,
  selectAuthError,
} from "./authSlice";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  if (isAuthorized) {
    // Уже авторизованы - на главную
    return <Navigate to="/documents" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginThunk({ username, password })).unwrap();
      navigate("/documents");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        mt: 10,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" textAlign="center">
        {t("loginTitle")} {/* "Авторизация" */}
      </Typography>

      <TextField
        label={t("loginUsernameLabel")} // "Логин"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <TextField
        label={t("loginPasswordLabel")} // "Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : t("loginButton")}
      </Button>

      {error && (
        <Alert severity="error">{t("errorLabel", { message: error })}</Alert>
      )}
    </Box>
  );
};

export default LoginPage;
