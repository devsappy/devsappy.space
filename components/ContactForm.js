"use client";

import { useState } from 'react';

const NEEDS = [
  { value: 'Build', hint: 'a website or web app' },
  { value: 'Cut', hint: 'video editing or motion' },
  { value: 'Both', hint: 'the product and its film' },
];

// No backend: the form drafts the email and hands it to the visitor's mail app,
// which is exactly what the button says it does.
export default function ContactForm({ email }) {
  const [need, setNeed] = useState('Build');
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '').trim();
    const from = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const next = {};
    if (!name) next.name = 'Add your name so I know who’s writing.';
    if (!from || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) next.email = 'Add an email address I can reply to, like jane@studio.com.';
    if (message.length < 10) next.message = 'Add a line or two about the project.';
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector(`[name="${Object.keys(next)[0]}"]`);
      first && first.focus();
      return;
    }
    const subject = `${need} — project enquiry from ${name}`;
    const body = `${message}\n\n—\n${name}\n${from}\nLooking for: ${need} (${NEEDS.find((n) => n.value === need).hint})`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <fieldset className="field">
        <legend className="field-label">What do you need?</legend>
        <div className="needs">
          {NEEDS.map((n) => (
            <label key={n.value} className={`need ${need === n.value ? 'is-on' : ''}`}>
              <input type="radio" name="need" value={n.value} checked={need === n.value} onChange={() => setNeed(n.value)} />
              <span className="need-title">{n.value}</span>
              <span className="need-hint">{n.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="field">
        <span className="field-label">Your name</span>
        <input name="name" type="text" autoComplete="name" placeholder="Jane Doe" aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'err-name' : undefined} />
        {errors.name && <span className="field-error" id="err-name">{errors.name}</span>}
      </label>

      <label className="field">
        <span className="field-label">Email</span>
        <input name="email" type="email" autoComplete="email" placeholder="jane@studio.com" aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? 'err-email' : undefined} />
        {errors.email && <span className="field-error" id="err-email">{errors.email}</span>}
      </label>

      <label className="field">
        <span className="field-label">About the project</span>
        <textarea name="message" rows={4} placeholder="What are you making, and when does it need to ship?" aria-invalid={errors.message ? true : undefined} aria-describedby={errors.message ? 'err-message' : undefined} />
        {errors.message && <span className="field-error" id="err-message">{errors.message}</span>}
      </label>

      <div className="contact-submit">
        <button type="submit" className="button button--light">
          <span>Send via email</span>
          <span aria-hidden="true">↗</span>
        </button>
        <p className="contact-note" aria-live="polite">
          {sent
            ? `Your email app should now be open with the message ready. If it isn’t, write to ${email}.`
            : 'Opens your email app with everything filled in.'}
        </p>
      </div>
    </form>
  );
}
