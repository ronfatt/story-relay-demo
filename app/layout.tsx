import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "StoryBah",
  description: "Interactive English story game for kids"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <header className="header">
            <div className="logo">
              <Link className="logo-link" href="/">
                StoryBah
              </Link>
            </div>
            <div className="header-actions">
              <div className="tagline">Create a story together in 10 rounds</div>
              <Link className="button ghost small" href="/">
                Home
              </Link>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
