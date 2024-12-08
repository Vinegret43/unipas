import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Unipas",
  description: "Ваш лучший помощник по программированию в МЭИ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="antialiased bg-background">
        {children}
      </body>
    </html>
  );
}
