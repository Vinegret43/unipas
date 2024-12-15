import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Unipas",
  description: "Программирование не должно казаться магией",
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
