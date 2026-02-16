import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Providers from "./providers";

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
        <Providers>
          <div className="page">
            <div className="bgFX" aria-hidden="true"></div>
            <div className="bgScan" aria-hidden="true"></div>
            <div className="bgWave" aria-hidden="true"></div>
            <div className="appShell">
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
          </div>
        </Providers>
      </body>
    </html>
  );
}
