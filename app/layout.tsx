import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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
                <Image
                  src="/storybah-logo.png"
                  alt="StoryBah"
                  width={160}
                  height={68}
                  priority
                />
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
