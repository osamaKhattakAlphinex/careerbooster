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

const DownloadDocx = ({ basicInfo, disabled }: any) => {
  const generateDocument = () => {
    loadFile("/resume-template72dw.docx", function (error: any, content: any) {
      if (error) {
        throw error;
      }
      var zip = new PizZip(content);
      var doc = new Docxtemplater().loadZip(zip);
      let primarySkillsTxt = "";
      let professionalSkillsTxt = "";
      let secondarySkillsTxt = "";
      basicInfo?.primarySkills.map((skil: string) => {
        primarySkillsTxt += `${skil}\n\r`;
      });
      basicInfo?.professionalSkills.map((skil: string) => {
        professionalSkillsTxt += `${skil}\n\r`;
      });
      basicInfo?.secondarySkills.map((skil: string) => {
        secondarySkillsTxt += `${skil}\n\r`;
      });
      doc.setData({
        name: basicInfo?.name,
        jobTitle: basicInfo?.name,
        sn: basicInfo?.shortName,
        phone: basicInfo?.contact?.phone,
        email: basicInfo?.contact?.email,
        address: basicInfo?.contact?.email,
        linkedIn: basicInfo?.contact?.linkedIn,
        summary: basicInfo?.summary,
        education_year: basicInfo?.education?.year,
        education_degree: basicInfo?.education?.degree,
        education_school: basicInfo?.education?.school,
        primary_skills: primarySkillsTxt,
        professional_skills: professionalSkillsTxt,
        secondary_skills: secondarySkillsTxt,
      });
      try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render();
      } catch (error: any) {
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
        // function replaceErrors(key: string, value: any): any {
        //   if (value instanceof Error) {
        //     return Object.getOwnPropertyNames(value).reduce(function (
        //       error: any,
        //       key: any
        //     ) {
        //       error[key] = value[key];
        //       return error;
        //     },
        //     {});
        //   }
        //   return value;
        // }
        // console.log(JSON.stringify({ error: error }, replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
          const errorMessages = error.properties.errors
            .map(function (error: any) {
              return error.properties.explanation;
            })
            .join("\n");
          console.log("errorMessages", errorMessages);
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
      console.log("aaa2");
    });
  };
  const handleDownloadDocx = () => {
    generateDocument();
  };

  return (
    <div>
      <button
        disabled={disabled || !basicInfo?.name}
        onClick={handleDownloadDocx}
        className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  disabled:bg-emerald-300"
      >
        <div className="flex flex-row gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>

          <span>Download Resume (.docx)</span>
        </div>
      </button>
    </div>
  );
};

export default DownloadDocx;
