import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Unipas",
  description: "Ваш лучший помощник по программированию в МЭИ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="antialiased flex flex-col h-[100vh] dark">
        <nav className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <Link href="/"><img src="/icons/logo.png"></img></Link>
          <div className="flex gap-8">
            <Link href="/study">Пособие</Link>
            <Link href="/editor">Компилятор</Link>
          </div>
        </nav>

        <main className="overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
