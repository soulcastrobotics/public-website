import Link from "next/link";

export default function NotFound() {
  return (
    <main className="lost">
      <div>
        <p className="eyebrow">// Signal lost</p>
        <h1 className="gradient-text">404</h1>
        <p>This part of the future hasn&apos;t been built yet.</p>
        <Link href="/" className="btn-primary">Return to base</Link>
      </div>
    </main>
  );
}
