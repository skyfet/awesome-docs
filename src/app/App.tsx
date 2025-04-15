import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import DocumentsPage from "../features/documents/DocumentsPage";
import RequireAuth from "../features/auth/RequireAuth";
import CssBaseline from "@mui/material/CssBaseline";

const isProd = import.meta.env.MODE === "production";
const basename = isProd ? "/awesome-docs" : "/";

function App() {
  return (
    <BrowserRouter
      basename={basename}
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <CssBaseline />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/documents"
          element={
            <RequireAuth>
              <DocumentsPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
