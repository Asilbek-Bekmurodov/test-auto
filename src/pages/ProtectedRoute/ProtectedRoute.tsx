// routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../Utilities/auth";

export default function ProtectedRoute() {
  const token = getToken();

  // token yo‘q bo‘lsa login/public ga qaytaradi
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // token bo‘lsa ichidagi route lar ochiladi
  return <Outlet />;
}
