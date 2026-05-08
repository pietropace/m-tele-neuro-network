import type { Metadata } from "next";
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
    <html lang="en">
      <body
        className={`${inter.variable} ${instrument.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}