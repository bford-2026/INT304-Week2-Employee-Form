import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmployeeForm from './components/EmployeeForm';

function Home() {
    return <h2>Home Page</h2>;
}

function About() {
    return <h2>About Page</h2>;
}

function App() {
    return (
        <Router>
            <div className="App">
                <h1>My React App</h1>

                <nav>
                    <Link to="/">Home</Link> |{" "}
                    <Link to="/about">About</Link> |{" "}
                    <Link to="/employee">Employee Form</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/employee" element={<EmployeeForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;