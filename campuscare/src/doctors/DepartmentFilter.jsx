export function DepartmentFilter({ departments, selectedDepartment, onSelectDepartment }) {
    return (
        <div className="category-bar">
            {departments.map((item) => (
                <button
                    key={item}
                    className={selectedDepartment === item ? "active" : ""}
                    onClick={() => onSelectDepartment(item)}
                >
                    {item}
                </button>
            ))}
        </div>
    );
}