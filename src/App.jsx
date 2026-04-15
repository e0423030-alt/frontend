import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import TrainerDashboard from "./pages/TrainerDashboard";

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" />;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (role && payload.role !== role) return <Navigate to="/" />;
    return children;
  } catch {
    return <Navigate to="/" />;
  }
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/employee"
          element={
            <PrivateRoute role="EMPLOYEE">
              <EmployeeDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/trainer"
          element={
            <PrivateRoute role="TRAINER">
              <TrainerDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}