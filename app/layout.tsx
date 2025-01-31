"use client"; // Esta directiva convierte el componente en un Client Component

import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { usePathname } from "next/navigation"; // Ahora puedes usar este hook

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: `%s - ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

// export const viewport: Viewport = {
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Obtenemos la ruta actual

  // Condiciona la renderización de Navbar y Footer
  // const isLoginPage = pathname === "/login"; // Verifica si estamos en la ruta /login
  //TODO: add routesCommonComponents to a constant file
  const routesCommonComponents = ["/login", "/signup", '/welcome']; // Rutas sin Navbar

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            {/* Condicionalmente renderiza el Navbar si no estamos en /login */}
            {!routesCommonComponents.includes(pathname) && <Navbar />}
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            {/* Condicionalmente renderiza el Footer si no estamos en /login */}
            {!routesCommonComponents.includes(pathname) && (
              <footer className="w-full flex items-center justify-center py-3">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://github.com/JimLoza"
                  title="Jim Loza Github"
                >
                  <span className="text-default-600">Powered by</span>
                  <p className="text-primary">JimLoza</p>
                </Link>
              </footer>
            )}
          </div>
        </Providers>
      </body>
    </html>
  );
}
