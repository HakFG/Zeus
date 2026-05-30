import type { Metadata } from "next";
import { PrivacyProvider } from "@/components/privacy/PrivacyProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zeus - Personal Finance",
  description: "Manage your finances with style",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PrivacyProvider>
          <div className="zeus-sky" id="zeus-sky"></div>
          <div className="app-container">
            {children}
          </div>
        </PrivacyProvider>
      </body>
    </html>
  );
}