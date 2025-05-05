import type { Metadata } from "next";
import "./globals.css";
import Provider from "./_comp/provider";

export const metadata: Metadata = {
  title: "NextJS Base + Tailwind",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased text-foreground bg-background`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
