
import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
     const response = await fetch("http://localhost:3000/students", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Registration failed."
        );
      }

      setMessage("Student registered successfully!");
      setMessageType("success");

      setFormData({
        name: "",
        email: "",
        password: "",
        department: "",
      });
    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Check that your backend is running."
          : error.message || "Something went wrong."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="register-card">
        <div className="logo">STUDENT PORTAL</div>

        <h1>Create Account</h1>

        <p className="subtitle">
          Register to access your student account.
        </p>

        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select your department</option>
              <option value="Computer Science">
                Computer Science
              </option>
              <option value="Statistics">
                Statistics
              </option>
              <option value="Mathematics">
                Mathematics
              </option>
              <option value="Software Engineering">
                Software Engineering
              </option>
              <option value="Cybersecurity">
                Cybersecurity
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <p className="footer-text">
          Already registered? Login functionality can be added
          with a separate backend login endpoint.
        </p>
      </div>
    </div>
  );
}

export default App;
