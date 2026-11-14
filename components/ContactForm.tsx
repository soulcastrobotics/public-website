"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";

const INTERESTS = [
  "Early access",
  "Partnership",
  "Investment",
  "Careers",
  "Just curious",
];

/**
 * No backend: the form composes a WhatsApp message from the fields
 * and opens a chat with Soulcast, pre-filled and ready to send.
 */
export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    interest: INTERESTS[0],
    message: "",
  });
  const [sent, setSent] = useState(false);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const optional = (label: string, v: string) => (v.trim() ? [`${label}: ${v.trim()}`] : []);
    const text = [
      `Hello ${site.name}!`,
      "",
      `Name: ${form.name.trim()}`,
      ...optional("Company", form.company),
      ...optional("Email", form.email),
      `Interested in: ${form.interest}`,
      "",
      form.message.trim(),
      "",
      "(Sent from soulcastrobotics.com)",
    ].join("\n");
    const url = whatsappLink(text);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    setSent(true);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field-row">
        <label className="field">
          <span>Name</span>
          <input required autoComplete="name" value={form.name} onChange={set("name")} placeholder="Your name" />
        </label>
        <label className="field">
          <span>Company <small>optional</small></span>
          <input autoComplete="organization" value={form.company} onChange={set("company")} placeholder="Where you work" />
        </label>
      </div>
      <div className="field-row">
        <label className="field">
          <span>Email <small>optional</small></span>
          <input type="email" autoComplete="email" value={form.email} onChange={set("email")} placeholder="you@company.com" />
        </label>
        <label className="field">
          <span>I&apos;m interested in</span>
          <select value={form.interest} onChange={set("interest")}>
            {INTERESTS.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="field">
        <span>Message</span>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us what you'd build if your work could think for itself…"
        />
      </label>
      <button type="submit" className="btn-primary">
        <WhatsAppIcon />
        <span>Send via WhatsApp</span>
      </button>
      <p className="form-note" role="status">
        {sent
          ? "WhatsApp opened in a new tab. Just hit send, and we'll be in touch."
          : "Opens WhatsApp with your message ready to send. Nothing is stored on this site."}
      </p>
    </form>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.47 9.47 0 0 1-4.83-1.32l-.35-.2-3.59.94.96-3.5-.23-.36a9.45 9.45 0 0 1-1.45-5.04c0-5.23 4.26-9.49 9.5-9.49 2.54 0 4.92.99 6.71 2.79a9.43 9.43 0 0 1 2.78 6.71c0 5.23-4.26 9.48-9.49 9.48zm8.08-17.57A11.35 11.35 0 0 0 12.04.58C5.74.58.61 5.7.61 12c0 2.01.53 3.98 1.53 5.71L.52 23.62l6.05-1.59a11.4 11.4 0 0 0 5.46 1.39h.01c6.3 0 11.43-5.12 11.43-11.42 0-3.05-1.19-5.92-3.35-8.07z" />
    </svg>
  );
}
