"use client";
//v1.0
import { useRef, useState } from "react";

const DownloadService = ({
  icon,
  className,
  componentRef,
  view,
  card,
  type,
  fileName,
  preview,
}: // setOpenUpgradModal,
any) => {
  const docRef = useRef<any>(null);
  let htmlToDoc: string;
  const [loading, setLoading] = useState(false);

  const templateCall = async () => {
    setLoading(true);
    if (card && type) {
      if (type === "coverLetter") {
        htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
        body {
          padding: 24px;
        }</style>
        ${card.coverLetterText}
        `;
      } else if (type === "email") {
        htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>
         <style>
        body {
          padding: 24px;
        }</style>
        ${card.emailText}
        `;
      } else if (type === "consultingBid") {
        htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>\
         <style>
        body {
          padding: 24px;
        }</style>
        ${card.consultingBidText}
        `;
      }
    } else if (type === "onPage") {
      const html = componentRef.current.outerHTML;
      htmlToDoc = `
      <script src="https://cdn.tailwindcss.com"></script>
       <style>
        body {
          padding: 24px;
        }</style>      
      ${html}`;
    } else {
      if (view) {
        await view();
      }
      const html = componentRef.current.outerHTML;
      htmlToDoc = `
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
       
       
h2[data-name="phone"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0idy00IGgtNCI+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtMy44NTUgNy4yODYgMS4wNjctLjUzNGExIDEgMCAwIDAgLjU0Mi0xLjA0NmwtLjQ0LTIuODU4QTEgMSAwIDAgMCA0LjAzNiAySDNhMSAxIDAgMCAwLTEgMXYyYzAgLjcwOS4wODIgMS40LjIzOCAyLjA2MmE5LjAxMiA5LjAxMiAwIDAgMCA2LjcgNi43QTkuMDI0IDkuMDI0IDAgMCAwIDExIDE0aDJhMSAxIDAgMCAwIDEtMXYtMS4wMzZhMSAxIDAgMCAwLS44NDgtLjk4OGwtMi44NTgtLjQ0YTEgMSAwIDAgMC0xLjA0Ni41NDJsLS41MzQgMS4wNjdhNy41MiA3LjUyIDAgMCAxLTQuODYtNC44NTlaIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIC8+Cjwvc3ZnPgo=");
  font-family: "YourIconFontFamily", sans-serif;
  font-size: 16px; /* Make sure --text is defined */
  color: #333;
  display: inline-block;
  height: 16px !important;
  width: 16px !important;
  margin-right: 6px;
}
h2[data-name="summary"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0idy00IGgtNCI+CiAgPHBhdGggZD0iTTggOGEzIDMgMCAxIDAgMC02IDMgMyAwIDAgMCAwIDZaTTEyLjczNSAxNGMuNjE4IDAgMS4wOTMtLjU2MS44NzItMS4xMzlhNi4wMDIgNi4wMDIgMCAwIDAtMTEuMjE1IDBjLS4yMi41NzguMjU0IDEuMTM5Ljg3MiAxLjEzOWg5LjQ3WiIgLz4KPC9zdmc+Cg==");
  font-family: "YourIconFontFamily", sans-serif;
  font-size: 16px; /* Make sure --text is defined */
  color: #333;
  display: inline-block;
  height: 16px !important;
  width: 16px !important;
  margin-right: 6px;
}
h2[data-name="primarySkills"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0idy00IGgtNCI+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTUgNC41QTMuNSAzLjUgMCAwIDEgMTEuNDM1IDhjLS45OS0uMDE5LTIuMDkzLjEzMi0yLjcuOTEzbC00LjEzIDUuMzFhMi4wMTUgMi4wMTUgMCAxIDEtMi44MjctMi44MjhsNS4zMDktNC4xM2MuNzgtLjYwNy45MzItMS43MS45MTQtMi43TDggNC41YTMuNSAzLjUgMCAwIDEgNC40NzctMy4zNjJjLjMyNS4wOTQuMzkuNDk3LjE1LjczNkwxMC42IDMuOTAyYS40OC40OCAwIDAgMC0uMDMzLjY1M2MuMjcxLjMxNC41NjUuNjA4Ljg3OS44NzlhLjQ4LjQ4IDAgMCAwIC42NTMtLjAzM2wyLjAyNy0yLjAyN2MuMjM5LS4yNC42NDItLjE3NS43MzYuMTUuMDkuMzEuMTM4LjYzNy4xMzguOTc2Wk0zLjc1IDEzYS43NS43NSAwIDEgMS0xLjUgMCAuNzUuNzUgMCAwIDEgMS41IDBaIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIC8+CiAgPHBhdGggZD0iTTExLjUgOS41Yy4zMTMgMCAuNjItLjAyOS45MTctLjA4NGwxLjk2MiAxLjk2MmEyLjEyMSAyLjEyMSAwIDAgMS0zIDNsLTIuODEtMi44MSAxLjM1LTEuNzM0Yy4wNS0uMDY0LjE1OC0uMTU4LjQyNi0uMjMzLjI3OC0uMDc4LjYzOS0uMTEgMS4wNjItLjEwMmwuMDkzLjAwMVpNNSA0bDEuNDQ2IDEuNDQ1YTIuMjU2IDIuMjU2IDAgMCAxLS4wNDcuMjFjLS4wNzUuMjY4LS4xNjkuMzc3LS4yMzMuNDI3bC0uNjEuNDc0TDQgNUgyLjY1NWEuMjUuMjUgMCAwIDEtLjIyNC0uMTM5bC0xLjM1LTIuN2EuMjUuMjUgMCAwIDEgLjA0Ny0uMjg5bC43NDUtLjc0NWEuMjUuMjUgMCAwIDEgLjI4OS0uMDQ3bDIuNyAxLjM1QS4yNS4yNSAwIDAgMSA1IDIuNjU0VjRaIiAvPgo8L3N2Zz4K");
  font-family: "YourIconFontFamily", sans-serif;
  font-size: 16px; /* Make sure --text is defined */
  color: #333;
  display: inline-block;
  height: 16px !important;
  width: 16px !important;
  margin-right: 6px;
}
h2[data-name="education"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0idy00IGgtNCI+CiAgPHBhdGggZD0iTTcuNzAyIDEuMzY4YS43NS43NSAwIDAgMSAuNTk3IDBjMi4wOTguOTEgNC4xMDUgMS45OSA2LjAwNCAzLjIyM2EuNzUuNzUgMCAwIDEtLjE5NCAxLjM0OEEzNC4yNyAzNC4yNyAwIDAgMCA4LjM0MSA4LjI1YS43NS43NSAwIDAgMS0uNjgyIDBjLS42MjUtLjMyLTEuMjYyLS42Mi0xLjkwOS0uOTAxdi0uNTQyYTM2Ljg3OCAzNi44NzggMCAwIDEgMi41NjgtMS4zMy43NS43NSAwIDAgMC0uNjM2LTEuMzU3IDM4LjM5IDM4LjM5IDAgMCAwLTMuMDYgMS42MDUuNzUuNzUgMCAwIDAtLjM3Mi42NDh2LjM2NWMtLjc3My0uMjk0LTEuNTYtLjU2LTIuMzU5LS44YS43NS43NSAwIDAgMS0uMTk0LTEuMzQ3IDQwLjkwMSA0MC45MDEgMCAwIDEgNi4wMDUtMy4yMjNaTTQuMjUgOC4zNDhjLS41My0uMjEyLTEuMDY3LS40MTEtMS42MTEtLjU5NmE0MC45NzMgNDAuOTczIDAgMCAwLS40MTggMi45Ny43NS43NSAwIDAgMCAuNDc0Ljc3NmMuMTc1LjA2OC4zNS4xMzguNTI0LjIxYTUuNTQ0IDUuNTQ0IDAgMCAxLS41OC42ODEuNzUuNzUgMCAxIDAgMS4wNiAxLjA2Yy4zNS0uMzQ5LjY1NS0uNzI2LjkxNS0xLjEyNGEyOS4yODIgMjkuMjgyIDAgMCAwLTEuMzk1LS42MTdBNS40ODMgNS40ODMgMCAwIDAgNC4yNSA4LjV2LS4xNTJaIiAvPgogIDxwYXRoIGQ9Ik03LjYwMyAxMy45NmMtLjk2LS42LTEuOTU4LTEuMTQ3LTIuOTg5LTEuNjM1YTYuOTgxIDYuOTgxIDAgMCAwIDEuMTItMy4zNDFjLjQxOS4xOTIuODM0LjM5MyAxLjI0NC42MDJhMi4yNSAyLjI1IDAgMCAwIDIuMDQ1IDAgMzIuNzg3IDMyLjc4NyAwIDAgMSA0LjMzOC0xLjgzNGMuMTc1Ljk3OC4zMTUgMS45NjkuNDE5IDIuOTdhLjc1Ljc1IDAgMCAxLS40NzQuNzc2IDI5LjM4NSAyOS4zODUgMCAwIDAtNC45MDkgMi40NjEuNzUuNzUgMCAwIDEtLjc5NCAwWiIgLz4KPC9zdmc+Cg==");
  font-family: "YourIconFontFamily", sans-serif;
  font-size: 16px; /* Make sure --text is defined */
  color: #333;
  display: inline-block;
  height: 16px !important;
  width: 16px !important;
  margin-right: 6px;
}
h2[data-name="workExperienceArray"][data-type-heading="true"]::before {
  content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0idy00IGgtNCI+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTEgNFYzYTIgMiAwIDAgMC0yLTJIN2EyIDIgMCAwIDAtMiAydjFINGEyIDIgMCAwIDAtMiAydjNhMiAyIDAgMCAwIDIgMmg4YTIgMiAwIDAgMCAyLTJWNmEyIDIgMCAwIDAtMi0yaC0xWk05IDIuNUg3YS41LjUgMCAwIDAtLjUuNXYxaDNWM2EuNS41IDAgMCAwLS41LS41Wk05IDlhMSAxIDAgMSAxLTIgMCAxIDEgMCAwIDEgMiAwWiIgY2xpcC1ydWxlPSJldmVub2RkIiAvPgogIDxwYXRoIGQ9Ik0zIDExLjgzVjEyYTIgMiAwIDAgMCAyIDJoNmEyIDIgMCAwIDAgMi0ydi0uMTdjLS4zMTMuMTEtLjY1LjE3LTEgLjE3SDRjLS4zNSAwLS42ODctLjA2LTEtLjE3WiIgLz4KPC9zdmc+Cg==");
  font-family: "YourIconFontFamily", sans-serif;
  font-size: 16px; /* Make sure --text is defined */
  color: #333;
  display: inline-block;
  height: 16px !important;
  width: 16px !important;
  margin-right: 6px;
}

[data-primarySkills-index]::before {
  content: "\\2022";
  font-family: "YourIconFontFamily", sans-serif;
  font-size: var(--text);
  color: #333;
  display: inline-block;
  margin-right: 6px;
}

[data-achievements-index]::before {
  content: "\\2022";
  font-family: "YourIconFontFamily", sans-serif;
  font-size: var(--text);
  color: #333;
  position: relative;
  top: 2px;
  margin-right: 10px;
}
        
       
        </style>
        ${html}`;




// htmlToDoc = `
// <script src="https://cdn.tailwindcss.com"></script>
// <style>
// .parent .child {
//     display: none;
// }
// .parent:hover .child {
//     display: block; 
// }

// </style>
// ${html}`;    
}
    setLoading(true);
    await fetch(`/api/template`, {
      method: "POST",
      body: JSON.stringify({
        htmlToDoc,
      }),
    }).then(async (response: any) => {
      const res = await response.json();
      const arrayBufferView = new Uint8Array(res.result.data);
      const blob = new Blob([arrayBufferView], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      docRef.current.href = url;
      if (!preview) {
        docRef.current.download = fileName;
      }
      // docRef.current.download = fileName;
      docRef.current.click();
      setLoading(false);
    });
  };

  return (
    <>
      <div className="hidden xs:block md:block">
        <a className="hidden" href="#" ref={docRef} target="_blank"></a>

        <button
          onClick={templateCall}
          type="button"
          disabled={loading}
          className={`flex flex-row gap-2 items-center xs:flex-1 lg:text-sm text-xs lg:px-6 px-3 py-2 rounded-full  bg-[#e4e9f7]  dark:bg-[#18181b] text-gray-900  dark:text-gray-300 border-[1px] border-[#f0f0f0]  ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          style={{
            borderColor: "white",
          }}
        >
          <div>
            {preview ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            )}
          </div>
          {preview ? "Print Preview " : loading ? "Downloading..." : "Download"}
        </button>
      </div>
    </>
  );
};

export default DownloadService;
