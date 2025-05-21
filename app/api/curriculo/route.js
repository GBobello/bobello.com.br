import { NextResponse } from "next/server";
import { createReadStream } from "fs";
import { statSync } from "fs";
import { join } from "path";

// Rota para GET /api/curriculo
export async function GET() {
  const filePath = join(
    process.cwd(),
    "public",
    "documentos",
    "cv_gbobello.pdf"
  );

  try {
    const stat = statSync(filePath);
    const stream = createReadStream(filePath);

    const response = new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="cv_gbobello.pdf"',
        "Content-Length": stat.size.toString(),
      },
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Arquivo não encontrado" },
      { status: 404 }
    );
  }
}
