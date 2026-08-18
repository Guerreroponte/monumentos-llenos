import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Ruta no disponible." },
    { status: 404 }
  );
}