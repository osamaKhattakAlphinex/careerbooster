import { useEffect, useState } from "react";

const DocumentPreview = ({
  uploadedFileName,
  setResumeContent,
}: {
  uploadedFileName: string;
  setResumeContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [fetchingData, setFetchingData] = useState<boolean>(false);
  const [content, setContent] = useState([]);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  useEffect(() => {
    if (uploadedFileName && uploadedFileName !== "") {
      setFetchingData(true);
      fetch(`/api/readFile?file=${uploadedFileName}`).then(
        async (resp: any) => {
          const res = await resp.json();
          if (res.success) {
            setContent(res.content);
            setFetchingData(false);
          }
        }
      );
    }
    if (window) {
      window.scrollTo(0, 0);
    }
  }, [uploadedFileName]);

  useEffect(() => {
    if (content && content.length !== 0 && showInfo) {
      let allPagesContent = "";
      content.forEach((obj: any) => {
        allPagesContent += obj.pageContent;
      });

      setResumeContent(allPagesContent);
    }
  }, [content, showInfo]);

  return (
    <div className="">
      <div className="w-full card">
        <button
          onClick={(e) => setShowInfo((p: boolean) => !p)}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {showInfo ? "Hide" : "Show"} info Fetched from your PDF
        </button>
        {showInfo && (
          <div
            className="card-body scrapped-content"
            style={{ overflow: "auto" }}
          >
            <h2 className="text-2xl font-semibold mb-2">Information</h2>
            {fetchingData && (
              <div
                className="flex items-center bg-blue-400 text-white text-sm font-bold px-4 py-3 mr-10 mt-8"
                role="alert"
              >
                <svg
                  className="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                </svg>
                <p>
                  Please wait while <span className="font-bold">AI-Bot</span> is
                  fetching data from the provided File.
                </p>
              </div>
            )}

            {content &&
              content.map((data: any, index: number) => (
                <pre className="w-full" key={index}>
                  {data.pageContent}
                </pre>
              ))}
            <hr className="my-10" />
          </div>
        )}
      </div>

      <div className="w-full card">
        <div
          className="card-body scrapped-content"
          style={{ overflow: "auto" }}
        >
          <h2 className="text-2xl font-semibold mb-2">Your Resume</h2>
          <iframe
            width={"100%"}
            height={"500px"}
            src={`/files/${uploadedFileName}`}
          ></iframe>
        </div>
      </div>
    </div>
  );
};
export default DocumentPreview;
