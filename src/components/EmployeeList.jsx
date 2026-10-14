
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../EmployeeForm.css';

function EmployeeList({ employees }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter employees by name, job title, or department
    const filteredEmployees = employees.filter((employee) => {
        const search = searchTerm.toLowerCase();

        return (
            (employee.name || '').toLowerCase().includes(search) ||
            (employee.jobTitle || '').toLowerCase().includes(search) ||
            (employee.department || '').toLowerCase().includes(search)
        );
    });

    return (
        <section className="employee-directory">
            <h2>Employee Directory</h2>

            <p className="directory-description">
                Browse employee records, search for employees,
                and view their information.
            </p>

            <div className="employee-search">
                <label htmlFor="employee-search-input">
                    Search Employees
                </label>

                <input
                    id="employee-search-input"
                    type="search"
                    placeholder="Search by name, job title, or department..."
                    value={searchTerm}
                    onChange={(event) =>
                        setSearchTerm(event.target.value)
                    }
                />
            </div>

            <p className="employee-results" aria-live="polite">
                Showing {filteredEmployees.length} of {employees.length}
                {' '}employees
            </p>

            {employees.length === 0 ? (
                <div className="empty-directory">
                    <p>No employees have been added yet.</p>

                    <Link to="/employee" className="dashboard-button">
                        Add Your First Employee
                    </Link>
                </div>
            ) : filteredEmployees.length === 0 ? (
                <div className="empty-directory">
                    <p>No employees match your search.</p>
                </div>
            ) : (
                <div className="employee-grid">
                    {filteredEmployees.map((employee) => (
                        <article
                            className="employee-card"
                            key={employee.EmployeeId}
                        >
                            <div className="employee-avatar" aria-hidden="true">
                                {(employee.name || 'E')
                                    .charAt(0)
                                    .toUpperCase()}
                            </div>

                            <h3>{employee.name}</h3>

                            <p>
                                <strong>Job Title:</strong>{' '}
                                {employee.jobTitle || 'Not provided'}
                            </p>

                            <p>
                                <strong>Department:</strong>{' '}
                                {employee.department || 'Not provided'}
                            </p>

                            <Link
                                to={`/employees/${employee.EmployeeId}`}
                                className="dashboard-button"
                            >
                                View Details
                            </Link>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

export default EmployeeList;
