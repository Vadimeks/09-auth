// app/layout.tsx
import styles from "./page.module.css";
import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { NotesProvider } from "@/app/context/notesContext";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Roboto } from "next/font/google";
import { Tag } from "@/types/note";
import homeStyles from "./Home.module.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Your Personal Note Manager to manage your notes efficiently.",
  openGraph: {
    title: "NoteHub",
    description: "Your Personal Note Manager to manage your notes efficiently.",
    url: "https://08-zustand-swart-three.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Preview",
      },
    ],
  },
};

const allTags: Tag[] = [
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Ideas",
  "Travel",
  "Finance",
  "Health",
  "Important",
  "Todo",
];

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <NotesProvider>
        <TanStackProvider>
          <html lang="en">
            <body className={`${roboto.variable} ${styles.body}`}>
              <Header allTags={allTags} />
              <main className={homeStyles.main}>{children}</main>
              <div id="modal-root" />
              {modal}
              <Footer />
            </body>
          </html>
        </TanStackProvider>
      </NotesProvider>
    </ClerkProvider>
  );
}
