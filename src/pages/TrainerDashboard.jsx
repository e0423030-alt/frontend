import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { createTraining, getMyTrainings } from "../api/api";

const TABS = [
  { key: "create", label: "Create Training" },
  { key: "my", label: "My Trainings" },
];

export default function TrainerDashboard() {
  const [activeTab, setActiveTab] = useState("create");
  const [trainings, setTrainings] = useState([]);
  const [form, setForm] = useState({ trainingName: "", description: "", seatLimit: "" });

  useEffect(() => { fetchTrainings(); }, []);

  const fetchTrainings = async () => {
    const result = await getMyTrainings();
    setTrainings(result.trainings || result.data || []);
  };

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async () => {
    const result = await createTraining(form);
    alert(result.message);
    setForm({ trainingName: "", description: "", seatLimit: "" });
    fetchTrainings();
    setActiveTab("my");
  };

  return (
    <div className="dashboard">
      <Sidebar role="TRAINER" activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />
      <div className="main-content">
        {activeTab === "create" && (
          <>
            <h2 className="section-title">Create Training</h2>
            <div className="create-form">
              <input name="trainingName" placeholder="Training Name" value={form.trainingName} onChange={handle} />
              <input name="description" placeholder="Description" value={form.description} onChange={handle} />
              <input name="seatLimit" placeholder="Seat Limit" value={form.seatLimit} onChange={handle} type="number" />
              <button className="create-btn" onClick={handleCreate}>Create Training</button>
            </div>
          </>
        )}
        {activeTab === "my" && (
          <>
            <h2 className="section-title">My Trainings</h2>
            <div className="card-grid">
              {trainings.map((t) => (
                <div className="training-card" key={t._id}>
                  <h3>{t.trainingName}</h3>
                  <p>{t.description}</p>
                  <div className="card-meta">
                    <span className="seat-badge">{t.enrolledCount}/{t.seatLimit} seats</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}