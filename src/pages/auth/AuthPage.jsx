import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, LogIn, UserPlus, Eye, EyeOff } from "lucide-react";

// ─── Inline styles / keyframes injected once ─────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary: #4f6ef7;
      --primary-dark: #3451d1;
      --navy: #1a2456;
      --bg: #f4f6ff;
      --surface: #ffffff;
      --border: #e2e6f3;
      --text: #0f172a;
      --text-light: #64748b;
      --text-muted: #94a3b8;
      --danger: #ef4444;
      --success: #22c55e;
      --radius: 28px;
    }

    body { font-family: 'DM Sans', sans-serif; }

    /* ── panel slide ── */
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(60px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-60px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-ring {
      0%,100% { box-shadow: 0 0 0 0 rgba(79,110,247,.35); }
      50%      { box-shadow: 0 0 0 12px rgba(79,110,247,0); }
    }

    .auth-wrapper {
      min-height: 100vh;
      background: var(--bg);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      position: relative;
      overflow: hidden;
    }

    /* ─ background orbs ─ */
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
      z-index: 0;
    }
    .orb-1 { width: 500px; height: 500px; background: rgba(79,110,247,.12); top: -150px; right: -150px; }
    .orb-2 { width: 400px; height: 400px; background: rgba(26,36,86,.10); bottom: -130px; left: -130px; }

    /* ─ card ─ */
    .auth-card {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 980px;
      min-height: 620px;
      border-radius: var(--radius);
      background: var(--surface);
      border: 1px solid var(--border);
      box-shadow: 0 24px 80px rgba(15,23,42,.10);
      display: grid;
      grid-template-columns: 1fr 1fr;
      overflow: hidden;
    }

    /* ─ coloured panel ─ */
    .brand-panel {
      background: linear-gradient(145deg, var(--primary) 0%, var(--primary-dark) 55%, var(--navy) 100%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 56px 48px;
      color: #fff;
      position: relative;
      overflow: hidden;
    }
    .brand-panel::before {
      content: '';
      position: absolute;
      top: -80px; right: -80px;
      width: 280px; height: 280px;
      background: rgba(255,255,255,.08);
      border-radius: 50%;
      filter: blur(40px);
    }
    .brand-panel .icon-box {
      width: 72px; height: 72px;
      border-radius: 20px;
      background: rgba(255,255,255,.15);
      backdrop-filter: blur(10px);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 32px;
    }
    .brand-panel h1 {
      font-family: 'Sora', sans-serif;
      font-size: 2.8rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 16px;
    }
    .brand-panel p {
      color: rgba(255,255,255,.78);
      font-size: 1rem;
      line-height: 1.7;
      margin-bottom: 36px;
      max-width: 340px;
    }
    .brand-feature {
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 16px;
      font-size: .93rem;
      color: rgba(255,255,255,.9);
    }
    .brand-feature .dot {
      width: 9px; height: 9px;
      border-radius: 50%;
      background: #fff;
      flex-shrink: 0;
    }
    .brand-panel .switch-hint {
      margin-top: 40px;
      font-size: .85rem;
      color: rgba(255,255,255,.65);
    }
    .brand-panel .switch-hint button {
      background: none; border: none; cursor: pointer;
      color: #fff;
      font-weight: 600;
      font-size: .85rem;
      text-decoration: underline;
      padding: 0; margin-left: 4px;
    }

    /* ─ form panel ─ */
    .form-panel {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 48px;
      overflow-y: auto;
    }
    .form-inner { width: 100%; max-width: 380px; }

    .back-btn {
      display: flex; align-items: center; gap: 6px;
      background: none; border: none; cursor: pointer;
      color: var(--text-light);
      font-size: .875rem;
      transition: color .2s;
      margin-bottom: 32px;
      padding: 0;
    }
    .back-btn:hover { color: var(--primary); }

    .form-logo {
      width: 58px; height: 58px;
      border-radius: 16px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 24px rgba(79,110,247,.35);
      margin-bottom: 20px;
      animation: pulse-ring 2.8s ease-in-out infinite;
    }
    .form-title {
      font-family: 'Sora', sans-serif;
      font-size: 2rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 6px;
    }
    .form-subtitle { color: var(--text-light); font-size: .9rem; margin-bottom: 28px; }

    /* ─ inputs ─ */
    .field { margin-bottom: 16px; }
    .field label {
      display: block;
      font-size: .8rem;
      font-weight: 600;
      color: var(--text-light);
      letter-spacing: .04em;
      text-transform: uppercase;
      margin-bottom: 7px;
    }
    .input-wrap { position: relative; }
    .input-wrap input {
      width: 100%;
      padding: 12px 16px;
      border: 1.5px solid var(--border);
      border-radius: 12px;
      background: #f8f9ff;
      font-family: 'DM Sans', sans-serif;
      font-size: .93rem;
      color: var(--text);
      outline: none;
      transition: border-color .2s, box-shadow .2s, background .2s;
    }
    .input-wrap input:focus {
      border-color: var(--primary);
      background: #fff;
      box-shadow: 0 0 0 3px rgba(79,110,247,.12);
    }
    .input-wrap input.error { border-color: var(--danger); }
    .input-wrap .eye-btn {
      position: absolute; right: 12px; top: 50%;
      transform: translateY(-50%);
      background: none; border: none; cursor: pointer;
      color: var(--text-muted); padding: 4px;
      display: flex; align-items: center;
    }
    .input-wrap input.has-eye { padding-right: 42px; }
    .error-msg { color: var(--danger); font-size: .78rem; margin-top: 5px; }

    /* ─ row inputs ─ */
    .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

    /* ─ remember row ─ */
    .remember-row {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 20px;
    }
    .remember-label {
      display: flex; align-items: center; gap: 7px;
      font-size: .85rem; color: var(--text-light); cursor: pointer;
    }
    .remember-label input { accent-color: var(--primary); }
    .forgot-link { font-size: .85rem; font-weight: 500; color: var(--primary); text-decoration: none; }
    .forgot-link:hover { color: var(--primary-dark); }

    /* ─ submit btn ─ */
    .submit-btn {
      width: 100%;
      padding: 13px;
      border: none;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
      color: #fff;
      font-family: 'Sora', sans-serif;
      font-size: .95rem;
      font-weight: 600;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      box-shadow: 0 6px 20px rgba(79,110,247,.38);
      transition: transform .15s, box-shadow .15s, opacity .15s;
      margin-bottom: 20px;
    }
    .submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(79,110,247,.42); }
    .submit-btn:active:not(:disabled) { transform: translateY(0); }
    .submit-btn:disabled { opacity: .7; cursor: not-allowed; }

    .divider {
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 18px;
    }
    .divider-line { flex: 1; height: 1px; background: var(--border); }
    .divider-text { font-size: .78rem; color: var(--text-muted); }

    .switch-text { text-align: center; font-size: .87rem; color: var(--text-light); }
    .switch-text button {
      background: none; border: none; cursor: pointer;
      font-weight: 700; color: var(--primary);
      font-size: .87rem; padding: 0; margin-left: 4px;
      transition: color .2s;
    }
    .switch-text button:hover { color: var(--primary-dark); }

    /* ─ animations for entering panels ─ */
    .animate-left  { animation: slideInLeft  .45s cubic-bezier(.22,1,.36,1) both; }
    .animate-right { animation: slideInRight .45s cubic-bezier(.22,1,.36,1) both; }
    .animate-form  { animation: fadeUp       .4s  cubic-bezier(.22,1,.36,1) both .05s; }

    /* ─ mobile ─ */
    @media (max-width: 820px) {
      .auth-card { grid-template-columns: 1fr; min-height: unset; }
      .brand-panel { display: none; }
      .form-panel { padding: 36px 28px; }
      .field-row { grid-template-columns: 1fr; gap: 0; }
    }
    @media (max-width: 480px) {
      .form-panel { padding: 28px 20px; }
      .form-title { font-size: 1.6rem; }
    }
  `}</style>
);

// ─── Reusable field ───────────────────────────────────────────────────────────
const Field = ({ label, name, type = "text", value, onChange, error, autoComplete }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div className="input-wrap">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`${error ? "error" : ""} ${isPassword ? "has-eye" : ""}`}
        />
        {isPassword && (
          <button type="button" className="eye-btn" onClick={() => setShow(s => !s)}>
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

// ─── Brand panel content ──────────────────────────────────────────────────────
const BrandPanel = ({ mode, onSwitch }) => {
  const isLogin = mode === "login";
  return (
    <div className={`brand-panel ${isLogin ? "animate-left" : "animate-right"}`}>
      <div className="icon-box">
        {isLogin ? <LogIn size={32} /> : <UserPlus size={32} />}
      </div>
      <h1>{isLogin ? <>Welcome<br />Back</> : <>Join<br />Us Today</>}</h1>
      <p>
        {isLogin
          ? "Sign in to access your dashboard, manage projects, collaborate with your team and stay productive."
          : "Create your account in seconds. Unlock powerful tools to manage projects, collaborate, and grow."}
      </p>
      {(isLogin
        ? ["Project Management", "Team Collaboration", "Real-Time Communication", "Secure Authentication"]
        : ["Free Forever Plan", "No Credit Card Needed", "Invite Your Team", "Enterprise-Grade Security"]
      ).map(f => (
        <div className="brand-feature" key={f}>
          <span className="dot" />
          <span>{f}</span>
        </div>
      ))}
      <p className="switch-hint">
        {isLogin ? "New here?" : "Already have an account?"}
        <button type="button" onClick={onSwitch}>
          {isLogin ? "Create an account" : "Sign in instead"}
        </button>
      </p>
    </div>
  );
};

// ─── Login form ───────────────────────────────────────────────────────────────
const LoginForm = ({ onSwitch, onBack }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 6) e.password = "Minimum 6 characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    // API call here
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="form-inner animate-form">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Home
      </button>
      <div className="form-logo"><LogIn size={24} color="#fff" /></div>
      <h2 className="form-title">Sign In</h2>
      <p className="form-subtitle">Welcome back! Please enter your details.</p>

      <form onSubmit={handleSubmit}>
        <Field label="Email Address" name="email" type="email" value={formData.email}
          onChange={handleChange} error={errors.email} autoComplete="email" />
        <Field label="Password" name="password" type="password" value={formData.password}
          onChange={handleChange} error={errors.password} autoComplete="current-password" />

        <div className="remember-row">
          <label className="remember-label">
            <input type="checkbox" /> Remember me
          </label>
          <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? <span style={{ animation: "pulse-ring 1s infinite" }}>Signing In…</span>
            : <><LogIn size={16} /> Sign In</>}
        </button>

        <div className="divider">
          <div className="divider-line" />
          <span className="divider-text">Secure Login</span>
          <div className="divider-line" />
        </div>

        <p className="switch-text">
          Don't have an account?
          <button type="button" onClick={onSwitch}>Create Account</button>
        </p>
      </form>
    </div>
  );
};

// ─── Register form ────────────────────────────────────────────────────────────
const RegisterForm = ({ onSwitch, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: "", email: "", password: "", confirmPassword: "", phone: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = "Full name is required";
    if (!formData.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.phone) e.phone = "Phone is required";
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.phone)) e.phone = "Enter a valid phone number";
    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 6) e.password = "Minimum 6 characters";
    if (!formData.confirmPassword) e.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    // API call here
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="form-inner animate-form">
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Home
      </button>
      <div className="form-logo"><UserPlus size={24} color="#fff" /></div>
      <h2 className="form-title">Create Account</h2>
      <p className="form-subtitle">Join thousands of teams already using the platform.</p>

      <form onSubmit={handleSubmit}>
        <div className="field-row">
          <Field label="Full Name" name="fullName" value={formData.fullName}
            onChange={handleChange} error={errors.fullName} autoComplete="name" />
          <Field label="Phone Number" name="phone" type="tel" value={formData.phone}
            onChange={handleChange} error={errors.phone} autoComplete="tel" />
        </div>
        <Field label="Email Address" name="email" type="email" value={formData.email}
          onChange={handleChange} error={errors.email} autoComplete="email" />
        <div className="field-row">
          <Field label="Password" name="password" type="password" value={formData.password}
            onChange={handleChange} error={errors.password} autoComplete="new-password" />
          <Field label="Confirm Password" name="confirmPassword" type="password"
            value={formData.confirmPassword} onChange={handleChange}
            error={errors.confirmPassword} autoComplete="new-password" />
        </div>

        <button type="submit" className="submit-btn" style={{ marginTop: 8 }} disabled={isLoading}>
          {isLoading ? <span>Creating Account…</span>
            : <><UserPlus size={16} /> Create Account</>}
        </button>

        <div className="divider">
          <div className="divider-line" />
          <span className="divider-text">Already a member?</span>
          <div className="divider-line" />
        </div>

        <p className="switch-text">
          Already have an account?
          <button type="button" onClick={onSwitch}>Sign In</button>
        </p>
      </form>
    </div>
  );
};

// ─── Main Auth Page ───────────────────────────────────────────────────────────
const AuthPage = () => {
  // "login" | "register"
  const [mode, setMode] = useState("login");
  // key forces re-mount → re-triggers animations
  const [animKey, setAnimKey] = useState(0);

  const switchTo = (next) => {
    setMode(next);
    setAnimKey(k => k + 1);
  };

  // Determine panel order: login → [brand|form], register → [form|brand]
  const isLogin = mode === "login";

  const navigate = typeof window !== "undefined"
    ? { push: (p) => (window.location.href = p) }
    : { push: () => {} };

  const handleBack = () => {
    if (typeof window !== "undefined") window.location.href = "/";
  };

  return (
    <>
      <GlobalStyles />
      <div className="auth-wrapper">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="auth-card" key={animKey}>
          {isLogin ? (
            <>
              <BrandPanel mode="login" onSwitch={() => switchTo("register")} />
              <div className="form-panel animate-right">
                <LoginForm onSwitch={() => switchTo("register")} onBack={handleBack} />
              </div>
            </>
          ) : (
            <>
              <div className="form-panel animate-left">
                <RegisterForm onSwitch={() => switchTo("login")} onBack={handleBack} />
              </div>
              <BrandPanel mode="register" onSwitch={() => switchTo("login")} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthPage;
