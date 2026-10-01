import React, { Component } from 'react';
import '../EmployeeForm.css';

class EmployeeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            jobTitle: '',
            department: ''
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const employee = {
            EmployeeId: Date.now(),
            name: this.state.name,
            email: this.state.email,
            jobTitle: this.state.jobTitle,
            department: this.state.department
        };

        this.props.addEmployee(employee);

        this.setState({
            name: '',
            email: '',
            jobTitle: '',
            department: ''
        });
    };

    render() {
        return (
            <div>
                <h2>Add Employee</h2>

                <form
                    className="employee-form"
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <label>Job Title:</label>
                        <input
                            type="text"
                            name="jobTitle"
                            value={this.state.jobTitle}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div>
                        <label>Department:</label>
                        <input
                            type="text"
                            name="department"
                            value={this.state.department}
                            onChange={this.handleChange}
                        />
                    </div>

                    <button type="submit">
                        Add Employee
                    </button>
                </form>
            </div>
        );
    }
}

export default EmployeeForm;