import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, loginUser, decodeToken } from "../api/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "EMPLOYEE" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    const result = await registerUser(form);
    if (result.message === "success") {
      const loginResult = await loginUser({ email: form.email, password: form.password });
      localStorage.setItem("token", loginResult.token);
      const payload = decodeToken(loginResult.token);
      navigate(payload.role === "TRAINER" ? "/trainer" : "/employee");
    } else {
      setMsg(result.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <input name="name" placeholder="Username" onChange={handle} />
        <input name="email" placeholder="Email address" onChange={handle} />
        <input name="password" type="password" placeholder="Password" onChange={handle} />
        <select name="role" onChange={handle}>
          <option value="EMPLOYEE">Employee</option>
          <option value="TRAINER">Trainer</option>
        </select>
        <button className="btn-primary" onClick={submit}>Register</button>
        {msg && <p className="error-msg">{msg}</p>}
        <p className="link-text">
          Already have an account? <Link to="/">Sign in</Link>
        </p>
      </div>
    </div>
  );
}