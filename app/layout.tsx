import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globalstyle/basestyle.scss"
import "./globalstyle/globals.scss";
import { ViewTransitions } from "next-view-transitions";
import Header from "./components/header/header";
import { ViewTransitionPageAnimation } from "./components/PageTransition/ViewTransitionPageAnimation";
import Footer from "./components/footer/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "Северная Изба | Деревянные дома с севера России",
  description: "Деревянные дома с севера России",
  keywords: ["деревянные дома", "северная изба", "дом из дерева", "дом из бруса", "дом из бревна", "дом из дерева", "дом из бруса", "дом из бревна"],
  openGraph: {
    title: "Северная Изба | Деревянные дома с севера России",
    description: "Деревянные дома с севера России",
    url: "/",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
    <html lang="ru">
      <body
        className={`${inter.className} antialiased`}
      >
        <ViewTransitionPageAnimation />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
    </ViewTransitions>
  );
}
