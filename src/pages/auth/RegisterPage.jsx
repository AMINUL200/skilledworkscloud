import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, ArrowLeft, Check } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: "", color: "" },
      { strength: 1, label: "Weak", color: "bg-red-500" },
      { strength: 2, label: "Fair", color: "bg-orange-500" },
      { strength: 3, label: "Good", color: "bg-yellow-500" },
      { strength: 4, label: "Strong", color: "bg-green-500" },
      { strength: 5, label: "Very Strong", color: "bg-green-600" },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        console.log("Register data:", formData);
        setIsLoading(false);
        // navigate("/signin");
      }, 1500);
    }
  };

  return (
    // ✅ h-screen instead of min-h-screen — locks layout to viewport height
    <div className="h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-200px] right-[-100px] w-[450px] h-[450px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-200px] left-[-100px] w-[450px] h-[450px] rounded-full bg-navy/10 blur-3xl" />
      </div>

      {/* ✅ h-full on the flex wrapper so the card stretches to fill the screen */}
      <div className="relative z-10 h-full flex items-center justify-center p-5">
        {/* ✅ max-h-[96vh] caps height; the card itself won't overflow the viewport */}
        <div className="w-full max-w-7xl h-full max-h-[96vh] grid lg:grid-cols-2 overflow-hidden rounded-[32px] shadow-card border border-border bg-surface">

          {/* LEFT SIDE — decorative panel, no scroll needed */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-primary via-primary-dark to-navy text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-8">
                <UserPlus size={36} />
              </div>

              <h1 className="text-5xl font-bold leading-tight mb-6">
                Create
                <br />
                Your Account
              </h1>

              <p className="text-white/80 text-lg leading-relaxed mb-10">
                Join our platform and manage projects, collaborate with teams,
                communicate in real time and grow productivity.
              </p>

              <div className="space-y-5">
                {[
                  "Project Management",
                  "Team Collaboration",
                  "Real-Time Communication",
                  "Secure Authentication",
                  "Analytics Dashboard",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — ✅ overflow-y-auto allows internal scroll if form is tall */}
          <div className="flex items-start justify-center p-6 md:p-10 overflow-y-auto">
            <div className="w-full max-w-lg">
              {/* Back Button */}
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-text-light hover:text-primary transition-all duration-300 mb-8"
              >
                <ArrowLeft size={18} />
                Back to Home
              </button>

              {/* Header */}
              <div className="mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-button mb-5">
                  <UserPlus size={28} className="text-white" />
                </div>

                <h2 className="text-4xl font-bold text-text mb-2">
                  Create Account
                </h2>

                <p className="text-text-light">
                  Fill in your details to get started.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <CustomInput
                    label="Full Name"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-danger">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <CustomInput
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-danger">{errors.email}</p>
                  )}
                </div>

                <div>
                  <CustomInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-danger">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <CustomInput
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{
                              width: `${(passwordStrength.strength / 5) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-text-light font-medium">
                          {passwordStrength.label}
                        </span>
                      </div>
                    </div>
                  )}

                  {errors.password && (
                    <p className="mt-1 text-sm text-danger">{errors.password}</p>
                  )}
                </div>

                <div>
                  <CustomInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-danger">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 accent-primary"
                    />
                    <span className="text-sm text-text-light">
                      I agree to the Terms & Conditions and Privacy Policy
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="mt-2 text-sm text-danger">{errors.terms}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary btn-block btn-lg"
                >
                  {isLoading ? (
                    "Creating Account..."
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Create Account
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-surface px-4 text-sm text-text-muted">
                      Secure Registration
                    </span>
                  </div>
                </div>

                {/* Login Link */}
                <div className="text-center pb-4">
                  <p className="text-text-light">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="font-semibold text-primary hover:text-primary-dark"
                    >
                      Sign In
                    </a>
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

export default RegisterPage;