import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./ui/NavBar";

export const metadata: Metadata = {
  title: "Mini Game",
  description: "Watahan Career Mini Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex h-screen flex-col md:overflow-hidden">
        <NavBar />
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
