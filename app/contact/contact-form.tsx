export default function ContactForm() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "#";
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? "#";
  const twitterUrl = process.env.NEXT_PUBLIC_TWITTER_URL ?? "#";
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "#";

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
    </div>
  );
}
