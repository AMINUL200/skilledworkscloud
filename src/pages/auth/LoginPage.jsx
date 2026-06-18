import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, LogIn } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../utils/app";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "admin@123",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear API error when user types
    if (apiError) {
      setApiError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous API error
    setApiError("");

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      // API CALL
      const response = await api.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      // Check if login was successful
      if (response.data.status === true) {
        // Use the login function from AuthContext
        login(response.data);
        
        // Redirect to dashboard or home page
        navigate("/admin"); // Adjust the route as needed
        toast.success("Login successful!");
      } else {
        // Handle unexpected response structure
        setApiError(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      // Handle API errors
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      // Extract error message from the interceptor's formatted error
      if (error.message) {
        setApiError(error.message);
      } else if (error.data?.message) {
        setApiError(error.data.message);
      } else if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        // Handle validation errors from backend
        const validationErrors = error.response.data.errors;
        if (typeof validationErrors === 'object') {
          // Set field-specific errors
          const fieldErrors = {};
          Object.keys(validationErrors).forEach((key) => {
            fieldErrors[key] = validationErrors[key][0] || validationErrors[key];
          });
          setErrors(fieldErrors);
        } else {
          setApiError(validationErrors);
        }
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-200px] right-[-100px] w-[450px] h-[450px] rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute bottom-[-200px] left-[-100px] w-[450px] h-[450px] rounded-full bg-navy/10 blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-5">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[32px] shadow-card border border-border bg-surface">
          {/* Left Side */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-primary via-primary-dark to-navy text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-8">
                <LogIn size={36} />
              </div>

              <h1 className="text-5xl font-bold leading-tight mb-6">
                Welcome
                <br />
                Back
              </h1>

              <p className="text-white/80 text-lg leading-relaxed mb-10">
                Sign in to access your dashboard, manage projects,
                collaborate with your team and stay productive.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-white" />
                  <span>Project Management</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-white" />
                  <span>Team Collaboration</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-white" />
                  <span>Real-Time Communication</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-white" />
                  <span>Secure Authentication</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md">
              {/* Back Button */}
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-text-light hover:text-primary transition-all duration-300 mb-8"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-all"
                />
                Back to Home
              </button>

              {/* Logo */}
              <div className="mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-button mb-5">
                  <LogIn size={28} className="text-white" />
                </div>

                <h2 className="text-4xl font-bold text-text mb-2">
                  Sign In
                </h2>

                <p className="text-text-light">
                  Welcome back! Please enter your details.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* API Error Message */}
                {apiError && (
                  <div className="bg-danger/10 border border-danger/20 text-danger p-3 rounded-lg text-sm">
                    {apiError}
                  </div>
                )}

                {/* Email */}
                <div>
                  <CustomInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    disabled={isLoading}
                  />

                  {errors.email && (
                    <p className="mt-2 text-sm text-danger">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <CustomInput
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={isLoading}
                  />

                  {errors.password && (
                    <p className="mt-2 text-sm text-danger">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-primary"
                      disabled={isLoading}
                    />
                    <span className="text-sm text-text-light">
                      Remember me
                    </span>
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary btn-block btn-lg"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-pulse">
                        Signing In...
                      </span>
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      Sign In
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative py-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>

                  <div className="relative flex justify-center">
                    <span className="bg-surface px-4 text-sm text-text-muted">
                      Secure Login
                    </span>
                  </div>
                </div>

                {/* Register */}
                <div className="text-center">
                  <p className="text-text-light">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="font-semibold text-primary hover:text-primary-dark"
                    >
                      Create Account
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;