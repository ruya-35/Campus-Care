import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { DepartmentFilter } from "./DepartmentFilter";
import DoctorList from "./DoctorList";
import { loadDoctors } from "../api/Api";

const DEPARTMENTS = ["All", "General", "Dental", "Optometry", "Counseling"];

function Doctors() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeDepartment = searchParams.get("department") || "All";

    const [searchQuery, setSearchQuery] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const searchInputRef = useRef(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        setLoading(true);
        setError(null);
        
        loadDoctors(activeDepartment, searchQuery, abortController.signal)
            .then((data) => {
                setDoctors(data);
            })
            .catch((err) => {
                if (err.name === "AbortError" || err.message?.includes("aborted")) {
                    return;
                }
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
            
        return () => abortController.abort();
    }, [activeDepartment, searchQuery]);
    
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
            {error && <p className="error-msg">Error: {error}</p>}
            {!loading && !error && (
                <DoctorList doctors={doctors} />
            )}
        </div>
    );
}

export default Doctors;