"use client";
import { useEffect, useState } from "react";

const ChatWithPDF = ({ uploadedFileName }: { uploadedFileName: string }) => {
  const [msgTxt, setMsgTxt] = useState<string>("");
  const [loading, setMsgLoading] = useState<boolean>(false); // msg loading
  // const [aiResp, setAIResp] = useState<string>("");

  const [vectorStoreMade, setVectorStoreMade] = useState<boolean>(false);
  const [chain, setChain] = useState<any>(null);

  const [mainLoading, setMainLoading] = useState<string>("chain");
  const [streamedData, setStreamedData] = useState("");

  const handleSendMsg = () => {
    setStreamedData("");
    if (msgTxt !== "") {
      setMsgLoading(true);
      const formData = {
        question: msgTxt,
        file: uploadedFileName,
      };
      fetch("/api/chatWithFile", {
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then(async (resp: any) => {
          const reader = resp.body.getReader();
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            const text = new TextDecoder().decode(value);
            setStreamedData((prev) => prev + text);
          }
          setMsgLoading(false);

          // const res = await resp.json();
          // setAIResp(res.result.output_text);
        })
        .catch((error) => {})
        .finally(() => {
          setMsgLoading(false);
        });
    }
  };

  const configureChain = async () => {
    if (!chain) {
      setMainLoading("chain");
      fetch("/api/createChain")
        .then(async (resp: any) => {
          const res = await resp.json();
          console.log("RES: ", res);
          if (res.success) {
            // setVectorStoreMade(true);
            // make chain
          }
        })
        .catch((error) => {})
        .finally(() => {
          setMainLoading("");
        });
    }
  };

  const makeVectorStore = async () => {
    if (uploadedFileName && !vectorStoreMade) {
      setMainLoading("vector");
      fetch("/api/makeVectorStore", {
        method: "POST",
        body: JSON.stringify({ file: uploadedFileName }),
      })
        .then(async (resp: any) => {
          const res = await resp.json();
          if (res.success) {
            setVectorStoreMade(true);
            // make chain
            configureChain();
          }
        })
        .catch((error) => {})
        .finally(() => {
          setMainLoading("vector");
        });
    }
  };

  useEffect(() => {
    // makeVectorStore();
  }, [uploadedFileName]);

  return (
    <div className="">
      {mainLoading !== "" ? (
        <div className="w-full card">
          <div
            className="card-body scrapped-content"
            style={{ overflow: "auto" }}
          >
            <p className="text-2xl">AI Chat Bot is preparing to Launch...</p>
            {mainLoading === "vector" && (
              <p className="text-lg">Making Vector Storage...</p>
            )}
            {mainLoading === "chain" && (
              <p className="text-lg">
                Making Conversational Chain...{" "}
                <button onClick={(e) => configureChain()}>Create Chain</button>
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full card">
          <div
            className="card-body scrapped-content"
            style={{ overflow: "auto" }}
          >
            <h2 className="text-2xl font-semibold mb-2">Chat with your File</h2>
            <textarea
              name="msgTxt"
              value={msgTxt}
              rows={5}
              className="w-full border border-gray-600 p-2 font-sans rounded-lg"
              onChange={(e) => setMsgTxt(e.target.value)}
            ></textarea>
            <button
              disabled={msgTxt === "" || loading}
              onClick={handleSendMsg}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:bg-gray-300"
            >
              {loading ? "Please wait.." : "Send"}
            </button>
            {streamedData && (
              <div className="m-4 bg-gray-200 rounded border p-4">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                    AI Response{" "}
                  </span>
                </h1>
                <div
                  className="font-sans whitespace-pre-wrap break-words"
                  // style={{ textW: "auto" }}
                >
                  {streamedData}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default ChatWithPDF;
