import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { DepartmentFilter } from "./DepartmentFilter";
import {DoctorList } from "./DoctorList";
import { loadDoctors } from "../api/doctors";
import { useFetch } from "../hooks/useFetch";

const DEPARTMENTS = ["All", "General", "Dental", "Optometry", "Counseling"];

function Doctors() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeDepartment = searchParams.get("department") || "All";

    const [searchQuery, setSearchQuery] = useState("");
    const { data, loading, error } = useFetch(
        () => loadDoctors(activeDepartment, searchQuery),
        [activeDepartment, searchQuery]
    );
    const doctors = data ?? [];
    const errorMessage = error?.message || error;

    const searchInputRef = useRef(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    function handleDepartmentChange(selectedDept) {
        if (selectedDept === "All") {
            setSearchParams({});
        } else {
            setSearchParams({ department: selectedDept });
        }
    }

    return (
        <div className="menu-container">
            <div className="search-container">
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search doctors by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>
            
            <DepartmentFilter
                departments={DEPARTMENTS}
                selectedDepartment={activeDepartment}
                onSelectDepartment={handleDepartmentChange}
            />
            
            {loading && <p className="loading-msg">Fetching doctors...</p>}
            {error && <p className="error-msg">Error: {errorMessage}</p>}
            {!loading && !error && (
                <DoctorList doctors={doctors} />
            )}
        </div>
    );
}

export default Doctors;