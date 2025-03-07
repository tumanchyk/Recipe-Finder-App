import "./globals.css";
import Link from "next/link";
import Image from "next/image";


export const metadata = {
  title: "Recipe Finder App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <header className="py-4 shadow-lg">
          <Link href='/' className="container center gap-6">
            <Image src='https://spoonacular.com/application/frontend/images/logo-simple-framed-green-gradient.svg' alt='logo' width={69} height={69} />
            <p className="font-bold text-3xl text-black">Recipe Finder</p>
          </Link>
        </header>
        <main className="bg-[#f1f1f194] min-h-screen py-16">
        {children}
        </main>
      </body>
    </html>
  );
}
