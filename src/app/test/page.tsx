"use client";
import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

export default function MyComponent() {
  const [file, setFile] = useState();
  const [text, setText] = useState("");

  // Handle file upload
  const onFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = async function (e: any) {
        const result = e.target.result;
        const pdf = await pdfjsLib.getDocument({ data: result }).promise;
        let content = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          content += textContent.items.map((item: any) => item.str).join(" ");
        }
        setText(content);
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  return (
    <div className="py-40">
      <input type="file" onChange={onFileChange} />
      <div>{text}</div>
    </div>
  );
}
