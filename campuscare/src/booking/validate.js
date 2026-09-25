/**
 * validate.js — Pure validation function (no React).
 * Takes form values, returns an errors object.
 * Empty object = valid.
 */
export function validateBooking(values) {
    const errors = {};

    // Student name — required, at least 2 characters
    if (!values.studentName || !values.studentName.trim()) {
        errors.studentName = "Full name is required.";
    } else if (values.studentName.trim().length < 2) {
        errors.studentName = "Name must be at least 2 characters.";
    }

    // Student ID — required, must match pattern like UGR/12345/12 or be at least 5 chars
    if (!values.idNumber || !values.idNumber.trim()) {
        errors.idNumber = "Student ID is required.";
    } else {
        const idPattern = /^UGR\/\d{4,5}\/\d{2}$/i;
        if (!idPattern.test(values.idNumber.trim()) && values.idNumber.trim().length < 5) {
            errors.idNumber = "Enter a valid student ID (e.g. UGR/12345/15).";
        }
    }

    // Date — required, must not be in the past
    if (!values.date) {
        errors.date = "Appointment date is required.";
    } else {
        const selected = new Date(values.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
            errors.date = "Date cannot be in the past.";
        }
    }

    // Slot — must be chosen (not the placeholder)
    if (!values.slot) {
        errors.slot = "Please select a time slot.";
    }

    // Reason — required, at least 5 characters
    if (!values.reason || !values.reason.trim()) {
        errors.reason = "Please describe your reason for the visit.";
    } else if (values.reason.trim().length < 5) {
        errors.reason = "Reason must be at least 5 characters.";
    }

    return errors;
}
