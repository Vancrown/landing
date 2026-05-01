export const metadata = {
  title: "Contact",
  description: "Get in touch with me.",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Contact</h1>
      <p className="text-lg">
        You can reach me at{" "}
        <a
          href="mailto:your-email@example.com"
          className="text-blue-500 hover:underline"
        >
          your-email@example.com
        </a>
      </p>
    </section>
  );
}
