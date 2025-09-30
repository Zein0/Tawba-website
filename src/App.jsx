import React, { useMemo, useState } from 'https://esm.sh/react@18.2.0';

const TAG_OPTIONS = [
  { value: 'general-issue', label: 'General issue' },
  { value: 'major-issue', label: 'Major issue' },
  { value: 'feature-request', label: 'Feature request' },
];

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tag: TAG_OPTIONS[0].value,
    description: '',
  });
  const [formStatus, setFormStatus] = useState('');

  const isValid = useMemo(() => {
    return (
      formData.name.trim().length > 0 &&
      /.+@.+\..+/.test(formData.email) &&
      formData.description.trim().length > 0
    );
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormStatus('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) {
      setFormStatus('Please complete all fields before submitting.');
      return;
    }

    const subject = encodeURIComponent(`Tawba Support • ${getTagLabel(formData.tag)}`);
    const bodyLines = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Tag: ${getTagLabel(formData.tag)}`,
      '',
      formData.description,
    ];

    const mailtoLink = `mailto:ahmadalzein06@gmail.com?subject=${subject}&body=${encodeURIComponent(
      bodyLines.join('\n')
    )}`;

    window.location.href = mailtoLink;
    setFormStatus('Your email client should now open with the support request.');
  };

  return (
    <div className="page">
      <div className="backdrop" aria-hidden="true" />
      <header className="hero">
        <div className="hero__content">
          <p className="badge">Support Tawba</p>
          <h1>Tawba is a free, offline Islamic app built to help Muslims track and repay missed prayers.</h1>
          <p className="hero__description">
            Need a hand or have an idea to make Tawba better? Reach out through the support form and we will get back to you.
          </p>
        </div>
      </header>

      <main className="card">
        <h2 className="card__title">Contact support</h2>
        <p className="card__subtitle">
          Share as many details as possible so we can respond quickly and effectively.
        </p>
        <form className="form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span className="field__label">Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </label>

          <label className="field">
            <span className="field__label">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />
          </label>

          <label className="field">
            <span className="field__label">Tag</span>
            <div className="select-wrapper">
              <select name="tag" value={formData.tag} onChange={handleChange}>
                {TAG_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="field">
            <span className="field__label">Description</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Describe the issue or idea"
              required
            />
          </label>

          {formStatus && <p className="form__status">{formStatus}</p>}

          <button className="submit" type="submit" disabled={!isValid}>
            Submit request
          </button>
        </form>
      </main>

      <footer className="footer">
        <p>Made with care to support the Tawba community.</p>
      </footer>
    </div>
  );
}

function getTagLabel(value) {
  const match = TAG_OPTIONS.find((option) => option.value === value);
  return match ? match.label : value;
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
