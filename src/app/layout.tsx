import type { Metadata, Viewport } from "next";
import { Nunito, Rubik } from "next/font/google";
import { kk } from "@/lib/i18n/kk";
import "./globals.css";

// cyrillic-ext обязателен для казахских букв Ә Ғ Қ Ң Ө Ұ Ү Һ І
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: kk.meta.title,
  description: kk.meta.description,
  applicationName: "Сары балапан",
  keywords: [
    "Сары балапан",
    "балабақша",
    "детский сад",
    "қазақ тілді балабақша",
    "үйірмелер",
    "Телжан Шонанулы 54А",
  ],
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: "/" },
  openGraph: {
    title: kk.meta.title,
    description: kk.meta.description,
    siteName: "Сары балапан",
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "only light",
  themeColor: "#fff3c4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="kk" className={`${nunito.variable} ${rubik.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Включает анимации появления только при работающем JS */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
