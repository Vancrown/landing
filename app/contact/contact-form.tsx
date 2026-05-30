"use client";

import { useState, type FormEvent } from "react";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};

  if (!name.trim()) {
    errors.name = "Name is required.";
  } else if (name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message.trim()) {
    errors.message = "Message is required.";
  } else if (message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "#";
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? "#";
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL ?? "#";
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "#";

  function handleFieldChange(
    field: "name" | "email" | "message",
    value: string,
  ) {
    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "message") setMessage(value);

    // reset success/error status when user starts editing again
    if (status === "success" || status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }

    // clear field error on change
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(name, email, message);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to send message.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputClass =
    "w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-900 dark:text-white";
  const errorClass = "text-red-600 dark:text-red-400 text-sm mt-1";

  return (
    <div className="space-y-8">
      {/* ── Email ── */}
      <div>
        <h2 className="font-medium text-lg mb-2">Email</h2>
        <a
          href={`mailto:${contactEmail}`}
          className="text-blue-500 hover:underline text-lg"
        >
          {contactEmail}
        </a>
      </div>

      {/* ── Social ── */}
      <div>
        <h2 className="font-medium text-lg mb-2">Social</h2>
        <ul className="space-y-1">
          <li>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Twitter / X
            </a>
          </li>
          <li>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>

      {/* ── Contact Form ── */}
      <div>
        <h2 className="font-medium text-lg mb-3">Send a Message</h2>
        <form className="space-y-4 max-w-lg" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className={inputClass}
            />
            {errors.name && <p className={errorClass}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              className={inputClass}
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Your message..."
              value={message}
              onChange={(e) => handleFieldChange("message", e.target.value)}
              className={inputClass}
            />
            {errors.message && <p className={errorClass}>{errors.message}</p>}
          </div>

          {status === "success" && (
            <p className="text-green-600 dark:text-green-400 text-sm">
              Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 dark:text-red-400 text-sm">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="px-6 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
