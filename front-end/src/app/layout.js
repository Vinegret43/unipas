import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Unipas",
  description: "Ваш лучший помощник по программированию в МЭИ",
};

export const viewport = {
    initialScale: 1,
    width: 'device-width'
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="antialiased bg-background">
        {children}
      </body>
    </html>
  );
}
