import { apiClient } from "./client";

export async function loadDoctors(department, search) {
    const data = await apiClient("/Doctors.json");

    return data.filter((doctor) => {
        const matchesDepartment = department === "All" || doctor.department === department;

        const docName = doctor.name ? doctor.name.toLowerCase() : "";
        const searchTerm = search ? search.trim().toLowerCase() : "";
        const matchesSearch = docName.includes(searchTerm);

        return matchesDepartment && matchesSearch;
    });
}