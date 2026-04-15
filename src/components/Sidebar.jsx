import { useNavigate } from "react-router-dom";

export default function Sidebar({ role, activeTab, setActiveTab, tabs }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-avatar">{role[0]}</div>
        <h2>{role === "TRAINER" ? "Trainer" : "Employee"}</h2>
      </div>
      <nav className="sidebar-nav">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`nav-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}