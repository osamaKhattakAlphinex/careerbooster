import formidable from "formidable";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // console.log("request", request);
  const form = formidable({ multiples: true });

  // const data = await form.parse(request, (err, fields, files) => {
  //   if (err) throw err;
  //   console.log(fields);
  //   console.log(files);
  // });
  const data = request.formData();
  // const file = data.get("file");
  //   console.log("data in file ", file);
  // if (!file) {
  //   return NextResponse.json({ success: false });
  // }

  //   const bytes = await file.arrayBuffer();
  //   const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location

  //   console.log("buffer: ");

  return NextResponse.json({ success: true });
}
