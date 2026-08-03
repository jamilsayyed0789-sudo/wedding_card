import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mujammil & Zikra | Reception Invitation",
  description: "You're warmly invited to celebrate the reception of Mujammil & Zikra on 25 October 2026 at Pune.",
  keywords: ["Mujammil and Zikra", "Reception Invitation", "Wedding Reception", "Pune Reception", "Digital Invitation"],
  authors: [{ name: "Mujammil & Zikra" }],
  openGraph: {
    title: "Mujammil & Zikra — Reception Invitation",
    description: "Together with our families, we invite you to join us as we celebrate our reception on 25 October 2026.",
    url: "https://mujammil-zikra-reception.vercel.app",
    siteName: "Mujammil & Zikra Reception",
    images: [
      {
        url: "/images/couple-main.jpg",
        width: 1200,
        height: 630,
        alt: "Mujammil & Zikra Reception Invitation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mujammil & Zikra | Reception Invitation",
    description: "You're warmly invited to celebrate the reception of Mujammil & Zikra.",
    images: ["/images/couple-main.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#F9F6FA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${sans.variable} ${script.variable} scroll-smooth`}>
      <body className="bg-[#F9F6FA] text-[#2D142C] antialiased selection:bg-[#9B51E0] selection:text-[#F9F6FA] font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
