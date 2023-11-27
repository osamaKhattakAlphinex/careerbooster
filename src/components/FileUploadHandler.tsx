"use client";
import { Document, pdfjs } from "react-pdf";
import React from "react";
import Script from "next/script";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const saveToLocalStorage = (text: any) => {
  localStorage.setItem("pdfText", text);
};

const FileUploadHandler = ({
  file,
  fetchRegistrationDataFromResume,
  text,
  setText,
}: any) => {
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
            const content = pageTexts.join(" ");
            //const content = removeSpecialChars(extractedText);
            setText(content);
            saveToLocalStorage(content);

            fetchRegistrationDataFromResume(content);
          })
          .catch((error) =>
            console.error("Failed to extract PDF text:", error)
          );
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div
      className="card-body scrapped-content hidden"
      style={{ overflow: "auto" }}
    >
      <Script type="text/javascript">
        {`
          (function(c,l,a,r,i,t,y){
          c[a]=c[a]function(){(c[a].q=c[a].q[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "jum6bniqm4");
        `}
      </Script>
      {/* Google tag (gtag.js) --> */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-NDN7TY5F2W"
      />
      <Script>
        {`

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-NDN7TY5F2W');
        `}
      </Script>
      {file && (
        <div>
          TEST
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} />
          <div>{text}</div>
        </div>
      )}
    </div>
  );
};

export default FileUploadHandler;
