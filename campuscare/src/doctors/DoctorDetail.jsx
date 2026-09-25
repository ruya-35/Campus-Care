import { useState, useEffect } from "react";
import { ArrowLeft, CalendarPlus } from "lucide-react";
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
            <Link to="/doctors" className="back-link">
                <ArrowLeft aria-hidden="true" size={17} />
                Back to Doctors List
            </Link>

            <div className="doctor-detail-heading">
                <img
                    className="doctor-detail-image"
                    src={doctor.image}
                    alt={`${doctor.name}, ${doctor.description}`}
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "/images/clinic-hero.jpg";
                    }}
                />
                <p className="doctor-detail-eyebrow">{doctor.category} care</p>
                <h2>{doctor.name}</h2>
                <p className="doctor-specialty">{doctor.description}</p>
            </div>

            <div className="doctor-meta">
                <span><strong>Department</strong>{doctor.department}</span>
                <span><strong>Specialty</strong>{doctor.description}</span>
            </div>

            <section className="doctor-detail-section">
                <h3>About the Doctor</h3>
                <p>{doctor.overview}</p>
            </section>

            <section className="doctor-detail-section">
                <h3>Care focus</h3>
                <p>{doctor.description} services for students and the campus community.</p>
            </section>

            <div className="actions doctor-actions">
                <Link to={`/doctors/${doctor.id}/book`} className="header-cta book-slot-btn">
                    <CalendarPlus aria-hidden="true" size={17} />
                    Book Appointment
                </Link>
            </div>
        </div>
    );
}

export default DoctorDetail;