import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Where can I watch it?",
  description: "This is a simple app that displays my movie list and the streaming providers I currently have, so I can easily see where to watch them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen p-4 antialiased`}>
        {children}

        <footer className="text-center mt-4 text-sm">
          Developed by <a href="https://twitter.com/maycomayco" target="_blank" rel="noopener noreferer" className="font-semibold">@maycomayco</a>
        </footer>
      </body>
    </html>
  );
}