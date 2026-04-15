import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, decodeToken } from "../api/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    const result = await loginUser(form);
    if (result.token) {
      localStorage.setItem("token", result.token);
      const payload = decodeToken(result.token);
      navigate(payload.role === "TRAINER" ? "/trainer" : "/employee");
    } else {
      setMsg(result.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <input name="email" placeholder="Email address" onChange={handle} />
        <input name="password" type="password" placeholder="Password" onChange={handle} />
        <button className="btn-primary" onClick={submit}>Login</button>
        {msg && <p className="error-msg">{msg}</p>}
        <p className="link-text">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}