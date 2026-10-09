
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

function Home() {
    return <h2>Home Page</h2>;
}

function About() {
    return <h2>About Page</h2>;
}

function EmployeeDetails({ employees }) {
    const { id } = useParams();

    const employee = employees.find(
        (item) => String(item.EmployeeId) === id
    );

    if (!employee) {
        return <p>Employee not found.</p>;
    }

    return (
        <div>
            <h2>Employee Details</h2>
            <p>Name: {employee.name}</p>
            <p>Email: {employee.email}</p>
            <p>Job Title: {employee.jobTitle}</p>
            <p>Department: {employee.department}</p>
            <Link to="/employees">Back to Employee List</Link>
        </div>
    );
}

function App() {
    const [employees, setEmployees] = useState(() => {
        const savedEmployees = localStorage.getItem('employees');

        if (savedEmployees) {
            return JSON.parse(savedEmployees);
        }

        return [];
    });

    const addEmployee = (employee) => {
        const newEmployee = {
            ...employee,
            EmployeeId: employee.EmployeeId ||
                Date.now().toString()
        };

        const updatedEmployees = [...employees, newEmployee];

        setEmployees(updatedEmployees);

        localStorage.setItem(
            'employees',
            JSON.stringify(updatedEmployees)
        );
    };

    return (
        <Router>
            <div className="App">
                <h1>Employee Management System</h1>

                <nav>
                    <Link to="/">Home</Link> |{" "}
                    <Link to="/about">About</Link> |{" "}
                    <Link to="/employee">Employee Form</Link> |{" "}
                    <Link to="/employees">Employee List</Link>
                </nav>

                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
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
                            <EmployeeList employees={employees} />
                        }
                    />

                    <Route
                        path="/employees/:id"
                        element={
                            <EmployeeDetails employees={employees} />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
