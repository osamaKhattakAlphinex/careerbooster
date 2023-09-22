"use client";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
let PizZipUtils: any = null;
if (typeof window !== "undefined") {
  import("pizzip/utils/index.js").then(function (r) {
    PizZipUtils = r;
  });
}

function loadFile(url: any, callback: any) {
  PizZipUtils.getBinaryContent(url, callback);
}

interface Props {
  jobDesc: string;
  keywords: string;
  headline: string;
  about: string;
}

const DownloadDocx = ({ jobDesc, keywords, headline, about }: Props) => {
  const generateDocument = () => {
    loadFile(
      "/profile-report-template-233se.docx",
      function (error: any, content: any) {
        if (error) {
          throw error;
        }
        var zip = new PizZip(content);
        var doc = new Docxtemplater().loadZip(zip);

        doc.setData({
          jobDesc,
          keywords,
          headline,
          about,
        });
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render();
        } catch (error: any) {
          if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors
              .map(function (error: any) {
                return error.properties.explanation;
              })
              .join("\n");
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
          }
          throw error;
        }
        var out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        // Output the document using Data-URI
        saveAs(out, "output.docx");
      }
    );
  };
  const handleDownloadDocx = () => {
    generateDocument();
  };

  return (
    <div>
      <button
        disabled={
          jobDesc === "" || keywords === "" || headline === "" || about === ""
        }
        onClick={handleDownloadDocx}
        className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-emerald-300"
      >
        <div className="flex flex-row gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`w-4 h-4`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
          <span>Download (DOCX)</span>
        </div>
      </button>
    </div>
  );
};

export default DownloadDocx;
