import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "a8 Real Estate Media Haus — Every Detail Matters",
  description: "Premium visual media for real estate. Photography, Video, 3D Tours, Drone & Floor Plans.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <LangProvider>
          <Cursor />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
