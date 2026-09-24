export async function loadDoctors(department, search, signal) {
    const res = await fetch("/Doctors.json");
    
    if (!res.ok) {
        throw new Error("Could not fetch the list of doctors.");
    }
    
    const data = await res.json();

    return data.filter((doctor) => {
        const matchesDepartment = department === "All" || doctor.department === department;
        
        const docName = doctor.name ? doctor.name.toLowerCase() : "";
        const searchTerm = search ? search.trim().toLowerCase() : "";
        const matchesSearch = docName.includes(searchTerm);

        return matchesDepartment && matchesSearch;
    });
}