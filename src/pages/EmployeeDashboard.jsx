import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getAllTrainings, enrollTraining, getMyEnrollments } from "../api/api";

const TABS = [
  { key: "available", label: "Available Trainings" },
  { key: "enrolled", label: "My Enrollments" },
];

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState("available");
  const [trainings, setTrainings] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const t = await getAllTrainings();
    setTrainings(t.trainings || t.data || []);
    const e = await getMyEnrollments();
    setEnrollments(e.enrollments || e.data || []);
  };

  const handleEnroll = async (id) => {
    const result = await enrollTraining(id);
    alert(result.message);
    fetchAll();
  };

  return (
    <div className="dashboard">
      <Sidebar role="EMPLOYEE" activeTab={activeTab} setActiveTab={setActiveTab} tabs={TABS} />
      <div className="main-content">
        {activeTab === "available" && (
          <>
            <h2 className="section-title">Available Trainings</h2>
            <div className="card-grid">
              {trainings.map((t) => (
                <div className="training-card" key={t._id}>
                  <h3>{t.trainingName}</h3>
                  <p>{t.description}</p>
                  <div className="card-meta">
                    <span className="seat-badge">{t.enrolledCount}/{t.seatLimit} seats</span>
                    <button className="enroll-btn" onClick={() => handleEnroll(t._id)}>Enroll</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {activeTab === "enrolled" && (
          <>
            <h2 className="section-title">My Enrollments</h2>
            <div className="card-grid">
              {enrollments.map((e, i) => (
                <div className="enrolled-card" key={i}>
                  <h3>{e.training ? e.training.trainingName : "No Training Found"}</h3>
                  <span className="enrolled-tag">Enrolled</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}