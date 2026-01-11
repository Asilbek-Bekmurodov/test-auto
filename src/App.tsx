import Auth from "./pages/Auth/Auth";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/home/Home";
import Test from "./components/Test/Test";
import Public from "./pages/public/Public";
import ResultPage from "./components/ResultTest/ResultTest";
import Example from "./pages/example/Example";
import NotFound from "./components/NotFound/NotFound";
import { ThemeProvider } from "./context/ThemeProvider";
import { getToken } from "./Utilities/auth";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";

function App() {
  const token = getToken();

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          {/* Agar token bo‘lsa rootdan home ga redirect */}
          <Route
            path="/"
            element={token ? <Navigate to="/home" replace /> : <Public />}
          />

          <Route path="/auth/*" element={<Auth />} />

          {/* Public testlar */}
          <Route path="/test/:type" element={<Test />} />
          <Route path="/test/topic/:slug" element={<Test />} />
          <Route path="/test/ticket/:number" element={<Test />} />

          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home/*" element={<Home />} />
          </Route>
          <Route path="/result/:sessionId" element={<ResultPage />} />

          <Route path="/example" element={<Example />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
