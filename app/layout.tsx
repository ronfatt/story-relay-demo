import "./globals.css";

export const metadata = {
  title: "Story Relay",
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
            <div className="logo">Story Relay</div>
            <div className="tagline">Create a story together in 10 rounds</div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
