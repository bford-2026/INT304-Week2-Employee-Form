
import React, { useState } from 'react';
import './App.css';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams
} from 'react-router-dom';

import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';

// Home Dashboard
function Home({ employees }) {
    return (
        <div className="home-dashboard">
            <h2>Welcome to the Employee Management System</h2>

            <p>
                Easily manage employee information, add new
                employees, and view employee records in one
                convenient location.
            </p>

            <div className="dashboard-card">
                <h3>Total Employees</h3>
                <p className="employee-count">
                    {employees.length}
                </p>
            </div>

            <div className="dashboard-actions">
                <Link
                    to="/employee"
                    className="dashboard-button"
                >
                    Add New Employee
                </Link>

                <Link
                    to="/employees"
                    className="dashboard-button"
                >
                    View Employees
                </Link>
            </div>
        </div>
    );
}

// About Page
function About() {
    return (
        <div className="about-page">
            <h2>About the Employee Management System</h2>

            <p>
                The Employee Management System is a React
                application designed to help organize and
                manage employee information.
            </p>

            <p>
                Users can add employees, view employee
                records, and access individual employee
                details through a simple navigation system.
            </p>

            <p>
                This application uses React components,
                React Router, state management, and
                browser localStorage to provide an
                interactive experience.
            </p>
        </div>
    );
}

// Employee Details Page
function EmployeeDetails({ employees }) {
    const { id } = useParams();

    const employee = employees.find(
        (item) => String(item.EmployeeId) === id
    );

    if (!employee) {
        return (
            <div className="employee-details">
                <h2>Employee Not Found</h2>
                <p>The requested employee could not be found.</p>
                <Link to="/employees">
                    Back to Employee List
                </Link>
            </div>
        );
    }

    return (
        <div className="employee-details">
            <h2>Employee Details</h2>

            <div className="details-card">
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p>
                    <strong>Job Title:</strong> {employee.jobTitle}
                </p>
                <p>
                    <strong>Department:</strong> {employee.department}
                </p>
            </div>

            <Link
                to="/employees"
                className="dashboard-button"
            >
                Back to Employee List
            </Link>
        </div>
    );
}

// Main Application
function App() {
    const [employees, setEmployees] = useState(() => {
        try {
            const savedEmployees =
                localStorage.getItem('employees');

            if (savedEmployees) {
                const parsedEmployees =
                    JSON.parse(savedEmployees);

                return Array.isArray(parsedEmployees)
                    ? parsedEmployees
                    : [];
            }
        } catch (error) {
            console.error(
                'Unable to load employee records:',
                error
            );
        }

        return [];
    });

    // Add and Save Employee
    const addEmployee = (employee) => {
        const newEmployee = {
            ...employee,
            EmployeeId:
                employee.EmployeeId ||
                Date.now().toString()
        };

        const updatedEmployees = [
            ...employees,
            newEmployee
        ];

        setEmployees(updatedEmployees);

        try {
            localStorage.setItem(
                'employees',
                JSON.stringify(updatedEmployees)
            );
        } catch (error) {
            console.error(
                'Unable to save employee records:',
                error
            );
        }
    };

    return (
        <Router>
            <div className="App">

                <header className="app-header">
                    <h1>Employee Management System</h1>

                    <p>
                        Employee Information and Management Dashboard
                    </p>
                </header>

                <nav className="main-navigation">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/employee">Employee Form</Link>
                    <Link to="/employees">Employee List</Link>
                </nav>

                <main className="main-content">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home employees={employees} />
                            }
                        />

                        <Route
                            path="/about"
                            element={<About />}
                        />

                        <Route
                            path="/employee"
                            element={
                                <EmployeeForm
                                    addEmployee={addEmployee}
                                />
                            }
                        />

                        <Route
                            path="/employees"
                            element={
                                <EmployeeList
                                    employees={employees}
                                />
                            }
                        />

                        <Route
                            path="/employees/:id"
                            element={
                                <EmployeeDetails
                                    employees={employees}
                                />
                            }
                        />
                    </Routes>
                </main>

                <footer className="app-footer">
                    <p>
                        Employee Management System |
                        INT 304 Web Design and Development
                    </p>
                </footer>

            </div>
        </Router>
    );
}

export default App;
