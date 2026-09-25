/**
 * Confirmation.jsx
 * Reads the booking reference from the route (:ref),
 * finds the matching appointment in the store,
 * and displays what was booked.
 */
import { useParams, Link } from "react-router-dom";
import { useAppointmentStore } from "../appointments/appointmentStore";

export function Confirmation() {
    const { ref } = useParams();
    const appointments = useAppointmentStore((state) => state.appointments);

    // Find the appointment by its id (ref is a string, appointment id is a number)
    const appointment = appointments.find(
        (appt) => String(appt.id) === ref
    );

    if (!appointment) {
        return (
            <div className="confirmation-page">
                <div className="confirmation-card confirmation-not-found">
                    <h2>Booking Not Found</h2>
                    <p>We couldn't find a booking with reference <strong>#{ref}</strong>.</p>
                    <div className="confirmation-actions">
                        <Link to="/doctors" className="add-btn">Browse Doctors</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="confirmation-page">
            <div className="confirmation-card">
                <div className="confirmation-icon">✓</div>
                <h2>Booking Confirmed!</h2>
                <p className="confirmation-subtitle">
                    Your appointment has been successfully scheduled.
                </p>

                <div className="confirmation-details">
                    <div className="detail-row">
                        <span className="detail-label">Reference</span>
                        <span className="detail-value">#{appointment.id}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Patient</span>
                        <span className="detail-value">{appointment.studentName}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Student ID</span>
                        <span className="detail-value">{appointment.idNumber}</span>
                    </div>
                    {appointment.doctorName && (
                        <div className="detail-row">
                            <span className="detail-label">Doctor</span>
                            <span className="detail-value">{appointment.doctorName}</span>
                        </div>
                    )}
                    {appointment.department && (
                        <div className="detail-row">
                            <span className="detail-label">Department</span>
                            <span className="detail-value">{appointment.department}</span>
                        </div>
                    )}
                    <div className="detail-row">
                        <span className="detail-label">Date</span>
                        <span className="detail-value">{appointment.date}</span>
                    </div>
                    <div className="detail-row">
                        <span className="detail-label">Time Slot</span>
                        <span className="detail-value">{appointment.slot}</span>
                    </div>
                    {appointment.reason && (
                        <div className="detail-row">
                            <span className="detail-label">Reason</span>
                            <span className="detail-value">{appointment.reason}</span>
                        </div>
                    )}
                </div>

                <div className="confirmation-actions">
                    <Link to="/appointments" className="add-btn">View All Appointments</Link>
                    <Link to="/doctors" className="back-link">Back to Doctors</Link>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
