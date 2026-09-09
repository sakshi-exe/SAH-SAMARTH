import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "sah-samarth-grievances";

const createGrievanceId = () => `SAH-${Math.floor(100000 + Math.random() * 900000)}`;

const readGrievances = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const blankForm = { name: "", mobile: "", category: "", description: "" };

const Grievance = ({ mode = "report" }) => {
  const [form, setForm] = useState(blankForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [grievanceId, setGrievanceId] = useState("");
  const [grievances, setGrievances] = useState(readGrievances);
  const [trackingId, setTrackingId] = useState("");
  const [trackedGrievance, setTrackedGrievance] = useState(null);
  const [copyMessage, setCopyMessage] = useState("");

  const descriptionLength = useMemo(() => form.description.length, [form.description]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(grievances));
  }, [grievances]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Full name is required.";
    if (!/^\d{10}$/.test(form.mobile.trim())) nextErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!form.category) nextErrors.category = "Please select a category.";
    if (form.description.trim().length < 20) nextErrors.description = "Description must be at least 20 characters.";
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      const id = createGrievanceId();
      const record = { id, ...form, status: "Open", submittedAt: new Date().toISOString() };
      setGrievanceId(id);
      setGrievances((previous) => [record, ...previous]);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const copyId = async () => {
    if (!grievanceId) return;
    try {
      await navigator.clipboard.writeText(grievanceId);
      setCopyMessage("Copied to clipboard");
    } catch {
      setCopyMessage(`Copy unavailable. Your ID is ${grievanceId}`);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm(blankForm);
    setErrors({});
    setGrievanceId("");
    setCopyMessage("");
  };

  const trackGrievance = (event) => {
    event.preventDefault();
    const match = grievances.find((item) => item.id.toLowerCase() === trackingId.trim().toLowerCase());
    setTrackedGrievance(match || false);
  };

  const heading = mode === "issues" ? "My Issues" : mode === "track" ? "Track Status" : "Report a Grievance";
  const subheading = mode === "issues"
    ? "Review grievances submitted from this browser."
    : mode === "track"
      ? "Enter a grievance ID to check its latest prototype status."
      : "Raise your issue and let us help you get it resolved.";

  return (
    <main className="grievance-page page-animated">
      <div className="page-heading">
        <div>
          <span className="eyebrow">CITIZEN SERVICES</span>
          <h1>{heading}</h1>
          <p>{subheading}</p>
        </div>
      </div>

      <div className="grievance-layout">
        <aside className="grievance-side">
          <div className="panel-surface info-panel">
            <div className="info-icon">📢</div>
            <h2>We're here to help.</h2>
            <p>Submit your complaint or issue related to cooperative services. Our system will help route it to the appropriate authority.</p>
          </div>
          <div className="panel-surface process-panel">
            <h3>How it works</h3>
            <div className="process-step"><span>01</span><div><strong>Submit</strong><p>Tell us about your issue.</p></div></div>
            <div className="process-step"><span>02</span><div><strong>Track</strong><p>Get a unique grievance ID.</p></div></div>
            <div className="process-step"><span>03</span><div><strong>Resolve</strong><p>Monitor the resolution status.</p></div></div>
          </div>
        </aside>

        <div className="panel-surface grievance-form-card">
          {mode === "issues" ? (
            <IssueHistory grievances={grievances} />
          ) : mode === "track" ? (
            <div className="tracking-panel">
              <div className="form-header"><h2>Find a grievance</h2><p>Use the SAH ID shown after a local demo submission.</p></div>
              <form className="tracking-form" onSubmit={trackGrievance}>
                <label htmlFor="tracking-id">Grievance ID</label>
                <div className="tracking-input-row">
                  <input id="tracking-id" value={trackingId} onChange={(event) => { setTrackingId(event.target.value); setTrackedGrievance(null); }} placeholder="Example: SAH-123456" required />
                  <button type="submit" className="primary-btn">Track</button>
                </div>
              </form>
              {trackedGrievance === false && <div className="empty-state tracking-result"><h3>No grievance found</h3><p>Check the ID and try again.</p></div>}
              {trackedGrievance && <GrievanceResult grievance={trackedGrievance} />}
            </div>
          ) : submitted ? (
            <div className="success-state" aria-live="polite">
              <div className="success-icon">✓</div>
              <h2>Grievance Submitted!</h2>
              <p>Your grievance has been successfully registered.</p>
              <div className="grievance-id" role="status"><span>GRIEVANCE ID</span><strong>{grievanceId}</strong></div>
              <div className="success-actions">
                <button type="button" className="secondary-btn" onClick={copyId}>Copy ID</button>
                <button type="button" className="primary-btn" onClick={resetForm}>Submit Another</button>
              </div>
              {copyMessage && <p className="copy-message" role="status">{copyMessage}</p>}
            </div>
          ) : (
            <>
              <div className="form-header"><h2>Submit your issue</h2><p>Fields marked with * are required.</p></div>
              <form onSubmit={handleSubmit} className="grievance-form" noValidate>
                <div className="form-row">
                  <FormField label="Full Name *" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" error={errors.name} />
                  <FormField label="Mobile Number *" name="mobile" value={form.mobile} onChange={handleChange} placeholder="Enter mobile number" type="tel" error={errors.mobile} />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Grievance Category *</label>
                  <select id="category" name="category" value={form.category} onChange={handleChange} aria-invalid={Boolean(errors.category)}>
                    <option value="">Select category</option><option value="registration">Cooperative Registration</option><option value="scheme">Government Scheme</option><option value="finance">Financial Support</option><option value="service">Cooperative Service</option><option value="other">Other</option>
                  </select>
                  {errors.category && <small className="field-error">{errors.category}</small>}
                </div>
                <div className="form-group">
                  <div className="label-row"><label htmlFor="description">Describe your issue *</label><span>{descriptionLength}/500</span></div>
                  <textarea id="description" name="description" value={form.description} onChange={(event) => { if (event.target.value.length <= 500) handleChange(event); }} placeholder="Describe your grievance in detail..." rows="6" aria-invalid={Boolean(errors.description)} />
                  {errors.description && <small className="field-error">{errors.description}</small>}
                </div>
                <button type="submit" className="submit-grievance" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit Grievance"}<span aria-hidden="true">→</span></button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

function FormField({ label, name, value, onChange, placeholder, type = "text", error }) {
  return <div className="form-group"><label htmlFor={name}>{label}</label><input id={name} name={name} value={value} onChange={onChange} placeholder={placeholder} type={type} aria-invalid={Boolean(error)} />{error && <small className="field-error">{error}</small>}</div>;
}

function GrievanceResult({ grievance }) {
  return <div className="tracking-result panel-surface" role="status"><div><span className="eyebrow">GRIEVANCE FOUND</span><h3>{grievance.id}</h3></div><span className="issue-status open">{grievance.status}</span><p>{grievance.description}</p><small>Submitted {new Date(grievance.submittedAt).toLocaleDateString()}</small></div>;
}

function IssueHistory({ grievances }) {
  if (grievances.length === 0) return <div className="empty-state"><div className="empty-icon">📋</div><h2>No issues yet</h2><p>Submitted grievances will appear here on this device.</p></div>;
  return <div className="issue-history"><div className="form-header"><h2>Submitted grievances</h2><p>Prototype records stored locally in this browser.</p></div>{grievances.map((grievance) => <div className="history-row" key={grievance.id}><div><strong>{grievance.id}</strong><span>{grievance.category}</span></div><span className="issue-status open">{grievance.status}</span><small>{new Date(grievance.submittedAt).toLocaleDateString()}</small></div>)}</div>;
}

export default Grievance;