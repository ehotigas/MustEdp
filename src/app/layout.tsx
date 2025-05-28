import PopupProvider from "@/components/popup/popup-provider";
import Menu from "@/components/menu/Menu";
import { Dosis } from "next/font/google";
import styles from "./layout.module.css";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const inter = Dosis({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simulador Must",
  description: "Simulador do Must desenvolvido pela equipe de Estudos de Mercado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <PopupProvider>
          <header className={styles.header}>
            <Link href="/">
              <img
                className={styles.imageIcon}
                src="/favicon.ico"
              />
              <p className={styles.iconName}>
                edp
              </p>
            </Link>
            <div className={styles.info}>
              <Menu/>
            </div> 
            <Link href="/">
              <p className={styles.info}>
                Home
              </p>
            </Link>
          </header>
          {children}
        </PopupProvider>
      </body>
    </html>
  );
}
