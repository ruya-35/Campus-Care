import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function DoctorDetail() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDoctorDetail() {
            try {
                const response = await fetch("/Doctors.json");
                const doctors = await response.json();
                const found = doctors.find((doc) => doc.id === Number(id));
                if (found) {
                    setDoctor(found);
                }
            } catch (error) {
                console.log("Error loading doctor profile:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDoctorDetail();
    }, [id]);

    if (loading) return <p className="loading-msg">Loading profile...</p>;
    if (!doctor) return <p className="error-msg">Doctor profile not found.</p>;

    return (
        <div className="dish-detail-container doctor-detail-card">
            <h2>{doctor.name}</h2>
            <p><strong>Department:</strong> {doctor.department}</p>
            <p className="overview-text">{doctor.bio || "Available for campus student consultations and treatment checkups."}</p>

            <div className="actions doctor-actions">
                <Link to={`/doctors/${doctor.id}/book`} className="add-btn book-slot-btn">Book Slot</Link>
                <Link to="/doctors" className="back-link">Back to Doctors List</Link>
            </div>
        </div>
    );
}

export default DoctorDetail;