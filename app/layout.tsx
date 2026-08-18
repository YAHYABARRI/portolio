import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Yahya Barri — Data & AI · Full Stack Developer",
    description: "Portfolio de Yahya Barri, étudiant Data & IA et développeur Full Stack. Projets en machine learning, logistique, opérations portuaires et civic tech.",
    openGraph: {
      title: "Yahya Barri — Data & AI · Full Stack Developer",
      description: "Building intelligence into every layer.",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1536, height: 1024, alt: "Yahya Barri — Data & AI · Full Stack Developer" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Yahya Barri — Data & AI · Full Stack Developer",
      description: "Building intelligence into every layer.",
      images: [`${origin}/og.png`],
    },
  };
}

export const viewport = { themeColor: "#050708", colorScheme: "dark" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
