import { Document, pdfjs } from "react-pdf";
import React, { useState, useEffect } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function removeSpecialChars(str: string) {
  // Remove new lines
  str = str.replace(/[\r\n]+/gm, "");

  // Remove Unicode characters
  str = str.replace(/[^\x00-\x7F]/g, "");

  // Remove icons
  str = str.replace(/[^\w\s]/gi, "");

  return str;
}

const saveToLocalStorage = (text: any) => {
  localStorage.setItem("pdfText", text);
  console.log("data saved to local storage");
};

const loadFromLocalStorage = () => {
  console.log("load from local storage", localStorage.getItem("pdfText"));
  return localStorage.getItem("pdfText");
};

const FileUploadHandler = ({ file, fetchRegistrationDataFromResume }: any) => {
  const [text, setText] = useState("");

  const onDocumentLoadSuccess = async () => {
    if (file) {
      const reader = new FileReader();

      reader.onload = async () => {
        const arrayBuffer: any = reader.result; // The PDF content as an ArrayBuffer
        const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
        const numPages = pdf.numPages;
        // Extract text from the entire document
        const textPromises = [];
        for (let i = 1; i <= numPages; i++) {
          textPromises.push(
            pdf
              .getPage(i)
              .then((page) => page.getTextContent())
              .then((textContent) => {
                const pageText = textContent.items
                  .map((item: any) => item.str)
                  .join(" ");
                return pageText;
              })
          );
        }

        Promise.all(textPromises)
          .then((pageTexts) => {
            const extractedText = pageTexts.join(" ");
            const content = removeSpecialChars(extractedText);
            console.log("extracted text: ", content);
            setText(content);
            saveToLocalStorage(content);
          })
          .catch((error) => console.error("Failed to extract PDF text:", error))
          .finally(() => {
            fetchRegistrationDataFromResume(text);
          });
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div
      className="card-body scrapped-content hidden"
      style={{ overflow: "auto" }}
    >
      {file && (
        <div>
          TEST
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} />
          <div>{text}</div>
        </div>
      )}
      {loadFromLocalStorage()}
    </div>
  );
};

export default FileUploadHandler;
