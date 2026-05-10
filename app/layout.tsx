import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
});

export const metadata: Metadata = {
  title: "ICS Maugeri Tele-Neurophysiology Network",
  description:
    "Interactive editorial experience for the ICS Maugeri tele-neurophysiology reporting network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl="/login"
      signInFallbackRedirectUrl="/admin"
      afterSignOutUrl="/login"
      appearance={{
        variables: {
          colorPrimary: "#2C5D6B",
          colorText: "#1F2F35",
          colorTextSecondary: "#7A8E95",
          colorBackground: "#FFFFFF",
          borderRadius: "0.25rem",
          fontFamily: "var(--font-sans)",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.variable} ${instrument.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
