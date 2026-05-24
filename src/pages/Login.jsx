import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../../app/context/AuthContext";

export default function Login() {
  const { isAuthenticated, login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegisterMode) {
        await register(formData.name, formData.email, formData.password);
        toast.success("Account created successfully! Welcome!");
      } else {
        await login(formData.email, formData.password);
        toast.success("Logged in successfully!");
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Authentication failed");
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode((prev) => !prev);
    setError("");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isRegisterMode ? "Create Account" : "Welcome Back"}</h2>
        <p className="auth-subtitle">
          {isRegisterMode
            ? "Sign up to start shopping"
            : "Log in to your account"}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {isRegisterMode && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required={isRegisterMode}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={4}
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : isRegisterMode
              ? "Register"
              : "Login"}
          </button>
        </form>

        <p className="auth-toggle">
          {isRegisterMode ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={toggleMode} className="link-btn">
            {isRegisterMode ? "Log in" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}
