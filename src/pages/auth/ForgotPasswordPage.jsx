import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Lock,
  CheckCircle,
  KeyRound,
} from "lucide-react";
import CustomInput from "../../component/form/CustomInput";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = (password) => {
    if (!password)
      return {
        strength: 0,
        label: "",
        color: "",
      };

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2)
      return {
        strength: score,
        label: "Weak",
        color: "bg-danger",
      };

    if (score <= 4)
      return {
        strength: score,
        label: "Medium",
        color: "bg-warning",
      };

    return {
      strength: score,
      label: "Strong",
      color: "bg-success",
    };
  };

  const passwordStrength = getPasswordStrength(
    formData.password
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      if (!validateStep1()) return;

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
      }, 1000);

      return;
    }

    if (step === 2) {
      if (!validateStep2()) return;

      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
        setSuccess(true);
      }, 1500);
    }
  };

  const passwordsMatch =
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-200px] right-[-100px] w-[450px] h-[450px] rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute bottom-[-200px] left-[-100px] w-[450px] h-[450px] rounded-full bg-navy/10 blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-5">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-[32px] shadow-card border border-border bg-surface">
          
          {/* LEFT */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-primary via-primary-dark to-navy text-white">
            <div className="w-20 h-20 rounded-3xl bg-white/15 flex items-center justify-center mb-8">
              <KeyRound size={38} />
            </div>

            <h1 className="text-5xl font-bold mb-6">
              Reset Your
              <br />
              Password
            </h1>

            <p className="text-white/80 text-lg mb-10">
              Securely recover access to your account and
              continue where you left off.
            </p>

            <div className="space-y-4">
              <div>✓ Secure Account Recovery</div>
              <div>✓ Fast Verification</div>
              <div>✓ Protected Authentication</div>
              <div>✓ Safe Password Reset</div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md">

              {!success ? (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 text-text-light hover:text-primary mb-8"
                  >
                    <ArrowLeft size={18} />
                    Back to Login
                  </button>

                  <div className="mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-button mb-5">
                      {step === 1 ? (
                        <Mail size={28} />
                      ) : (
                        <Lock size={28} />
                      )}
                    </div>

                    <h2 className="text-4xl font-bold text-text mb-2">
                      {step === 1
                        ? "Forgot Password"
                        : "Create New Password"}
                    </h2>

                    <p className="text-text-light">
                      {step === 1
                        ? "Enter your email to continue."
                        : "Set a new password for your account."}
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {step === 1 && (
                      <div>
                        <CustomInput
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />

                        {errors.email && (
                          <p className="mt-2 text-sm text-danger">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    )}

                    {step === 2 && (
                      <>
                        <div>
                          <CustomInput
                            label="New Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                          />

                          {formData.password && (
                            <div className="mt-3">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                                    style={{
                                      width: `${
                                        (passwordStrength.strength /
                                          5) *
                                        100
                                      }%`,
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
                            <p className="mt-2 text-sm text-danger">
                              {errors.password}
                            </p>
                          )}
                        </div>

                        <div>
                          <CustomInput
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={
                              formData.confirmPassword
                            }
                            onChange={handleChange}
                          />

                          {passwordsMatch && (
                            <p className="mt-2 text-sm text-success">
                              ✓ Passwords match
                            </p>
                          )}

                          {errors.confirmPassword && (
                            <p className="mt-2 text-sm text-danger">
                              {errors.confirmPassword}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary btn-block btn-lg"
                    >
                      {isLoading
                        ? "Please wait..."
                        : step === 1
                        ? "Continue"
                        : "Reset Password"}
                    </button>
                  </form>

                  <div className="text-center mt-6">
                    <Link
                      to="/login"
                      className="text-primary font-semibold hover:text-primary-dark"
                    >
                      Back to Login
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-success/10 mx-auto flex items-center justify-center mb-6">
                    <CheckCircle
                      size={50}
                      className="text-success"
                    />
                  </div>

                  <h2 className="text-3xl font-bold text-text mb-4">
                    Password Reset Successful
                  </h2>

                  <p className="text-text-light mb-8">
                    Your password has been updated successfully.
                  </p>

                  <button
                    onClick={() => navigate("/login")}
                    className="btn btn-success btn-lg"
                  >
                    Go To Login
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;