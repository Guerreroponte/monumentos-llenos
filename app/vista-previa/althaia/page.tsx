import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AlthaiaPreview from "@/components/AlthaiaPreview";

export const metadata: Metadata = {
  title: "Cervezas Althaia · Vista previa",
  description: "Propuesta pendiente de aprobación de Cervezas Althaia.",
  robots: { index: false, follow: false },
};

export default function AlthaiaPreviewPage() {
  // This draft must never become accessible in a production deployment.
  if (process.env.NODE_ENV !== "development") notFound();
  return <AlthaiaPreview />;
}
