import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import DocumentsPage from "../features/documents/DocumentsPage";
import RequireAuth from "../features/auth/RequireAuth";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <BrowserRouter
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
