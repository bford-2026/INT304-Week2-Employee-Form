
import React, { Component } from 'react';
import '../EmployeeForm.css';

class EmployeeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            jobTitle: '',
            department: '',
            successMessage: ''
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
            successMessage: ''
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const {
            name,
            email,
            jobTitle,
            department
        } = this.state;

        // Prevent empty or whitespace-only entries
        if (
            !name.trim() ||
            !email.trim() ||
            !jobTitle.trim() ||
            !department.trim()
        ) {
            return;
        }

        const employee = {
            EmployeeId: Date.now().toString(),
            name: name.trim(),
            email: email.trim(),
            jobTitle: jobTitle.trim(),
            department: department.trim()
        };

        // Send employee information to App.js
        this.props.addEmployee(employee);

        // Clear the form and show confirmation
        this.setState({
            name: '',
            email: '',
            jobTitle: '',
            department: '',
            successMessage:
                'Employee added successfully!'
        });
    };

    render() {
        return (
            <section className="employee-form-page">
                <h2>Add New Employee</h2>

                <p className="form-description">
                    Complete the form below to add a new
                    employee to the Employee Management System.
                </p>

                <form
                    className="employee-form"
                    onSubmit={this.handleSubmit}
                >
                    <div className="form-group">
                        <label htmlFor="employee-name">
                            Full Name
                        </label>

                        <input
                            id="employee-name"
                            type="text"
                            name="name"
                            placeholder="Enter employee full name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="employee-email">
                            Email Address
                        </label>

                        <input
                            id="employee-email"
                            type="email"
                            name="email"
                            placeholder="Enter employee email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="employee-job-title">
                            Job Title
                        </label>

                        <input
                            id="employee-job-title"
                            type="text"
                            name="jobTitle"
                            placeholder="Enter employee job title"
                            value={this.state.jobTitle}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="employee-department">
                            Department
                        </label>

                        <input
                            id="employee-department"
                            type="text"
                            name="department"
                            placeholder="Enter employee department"
                            value={this.state.department}
                            onChange={this.handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Add Employee
                    </button>

                    {this.state.successMessage && (
                        <p
                            className="success-message"
                            role="status"
                        >
                            {this.state.successMessage}
                        </p>
                    )}
                </form>
            </section>
        );
    }
}

export default EmployeeForm;
