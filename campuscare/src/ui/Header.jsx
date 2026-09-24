const clinicName = "CampusCare Clinic";

export function Header() {
    return (
        <div className="header">
            <h1>{clinicName}</h1>
            <h1>Student Health & Appointment Portal</h1>
            <h3 className="location">📍 Campus Main Medical Center</h3>
        </div>
    );
}