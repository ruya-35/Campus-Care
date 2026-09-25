import { Link } from "react-router-dom";
import { CalendarPlus } from "lucide-react";

export function DoctorList({ doctors }) {
    if (!doctors || doctors.length === 0) {
        return <p className="loading-msg">No doctors found matching criteria.</p>;
    }

    return (
        <div className="menu-grid">
            {doctors.map((doctor) => {
                const deptClass = doctor.department ? `menu-card ${doctor.department.toLowerCase()}` : "menu-card";

                return (
                    <div key={doctor.id} className={deptClass}>
                        <Link to={`/doctors/${doctor.id}`} className="doctor-link">
                            <img
                                className="doctor-card-image"
                                src={doctor.image}
                                alt={`${doctor.name}, ${doctor.description}`}
                                onError={(event) => {
                                    event.currentTarget.onerror = null;
                                    event.currentTarget.src = "/images/clinic-hero.jpg";
                                }}
                            />
                            <div className="doctor-card-content">
                                <h3>{doctor.name}</h3>
                                <p><strong>Department:</strong> {doctor.department}</p>
                                <p>{doctor.description}</p>
                            </div>
                        </Link>
                        <Link to={`/doctors/${doctor.id}/book`} className="header-cta book-appointment-btn">
                            <CalendarPlus aria-hidden="true" size={17} />
                            <span>Book Appointment</span>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default DoctorList;