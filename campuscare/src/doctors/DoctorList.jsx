import { Link } from "react-router-dom";

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
                            <h3>{doctor.name}</h3>
                        </Link>
                        <p><strong>Department:</strong> {doctor.department}</p>
                        <p>{doctor.bio || doctor.specialty}</p>
                        <Link to={`/doctors/${doctor.id}/book`} className="add-btn book-appointment-btn">
                            Book Appointment
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default DoctorList;