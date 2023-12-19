import { NextResponse } from "next/server";
import path from "path";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export const maxDuration = 10; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req: any) {
  try {
    const body = await req.json();
    if (body) {
      const reqBody = body;
      const file = reqBody.file;
      const email = reqBody.email;

      if (file) {
        // load file
        let dir;
        if (email) {
          dir = path.join(
            process.cwd() + "/public",
            "/files",
            `/userResumes`,
            `/${email}`
          );
        } else {
          // DEPRECATED for old register wizard
          dir = path.join(process.cwd() + "/public", "/files", `/temp`);
        }

        const loader = new PDFLoader(`${dir}/${file}`);
        const docs = await loader.load();

        let content = docs.map((doc: any) => doc.pageContent);
        let rawCVContent = content.join(" ");
        return NextResponse.json(
          { success: true, text: rawCVContent },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { result: "something went wrong", success: false },
      { status: 500 }
    );
  }
}
