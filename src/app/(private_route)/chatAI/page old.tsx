// "use client";
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { getFilesForUser } from "@/helpers/getFilesForUser";
// import Link from "next/link";
// import { leftArrowIcon } from "@/helpers/iconsProvider";

// const ChatAI = () => {
//   const [msgTxt, setMsgTxt] = useState<string>("what is my name?");
//   const [loading, setMsgLoading] = useState<boolean>(false); // msg loading

//   const [vectorStoreMade, setVectorStoreMade] = useState<boolean>(false);
//   const [chain, setChain] = useState<any>(null);

//   const [mainLoading, setMainLoading] = useState<string>("");
//   const [streamedData, setStreamedData] = useState("");
//   const { data: session, status } = useSession();

//   const handleSendMsg = async () => {
//     setStreamedData("");
//     if (msgTxt !== "" && session?.user?.email) {
//       setMsgLoading(true);
//       const data = await getFilesForUser(session?.user?.email);
//       console.log("files", data);
//       const formData = {
//         question: msgTxt,
//         email: session?.user?.email,
//         data,
//       };

//       fetch("/api/chatWithFile", {
//         method: "POST",
//         body: JSON.stringify(formData),
//       })
//         .then(async (resp: any) => {
//           if (resp.ok) {
//             // const res = await resp.json();
//             // setStreamedData(res.result.output_text);
//             const reader = resp.body.getReader();
//             while (true) {
//               const { done, value } = await reader.read();

//               if (done) {
//                 break;
//               }

//               const text = new TextDecoder().decode(value);
//               setStreamedData((prev) => prev + text);
//             }
//           } else {
//             setStreamedData("Error! Something went wrong");
//           }
//           setMsgLoading(false);
//         })
//         .catch((error) => {
//           console.log("Error encountered");
//         })
//         .finally(() => {
//           setMsgLoading(false);
//         });
//     }
//   };

//   // const configureChain = async () => {
//   //   if (!chain) {
//   //     setMainLoading("chain");
//   //     fetch("/api/createChain")
//   //       .then(async (resp: any) => {
//   //         const res = await resp.json();
//   //         if (res.success) {
//   //           // make chain
//   //           setChain(res.chain);
//   //         }
//   //       })
//   //       .catch((error) => {})
//   //       .finally(() => {
//   //         setMainLoading("");
//   //       });
//   //   }
//   // };

//   // const makeVectorStore = async () => {
//   //   console.clear();
//   //   if (session?.user?.email && !vectorStoreMade) {
//   //     setMainLoading("vector");
//   //     fetch("/api/makeVectorStore", {
//   //       method: "POST",
//   //       body: JSON.stringify({ email: session?.user?.email }),
//   //     })
//   //       .then(async (resp: any) => {
//   //         const res = await resp.json();
//   //         if (res.success) {
//   //           console.log(res);
//   //           // setVectorStoreMade(true);
//   //           // make chain
//   //           // configureChain();
//   //         }
//   //       })
//   //       .catch((error) => {})
//   //       .finally(() => {
//   //         setMainLoading("");
//   //       });
//   //   }
//   // };

//   // useEffect(() => {
//   //   makeVectorStore();
//   // }, [uploadedFileName]);

//   return (
//     <>
//       <div className="my-5 ml-10 pt-30 ">
//         <Link
//           href="/dashboard"
//           className="flex flex-row gap-2 items-center hover:font-semibold transition-all"
//         >
//           {leftArrowIcon}
//         </Link>
//       </div>
//       <div className=" lg:ml-[244px] mt-2 w-[95%]  p-4  border border-gray-200 rounded-lg shadow sm:p-6 mb-40">
//         {mainLoading !== "" ? (
//           <div className="w-full ">
//             <div className=" scrapped-content" style={{ overflow: "auto" }}>
//               <p className="text-2xl">AI Chat Bot is preparing to Launch...</p>
//               {mainLoading === "vector" && (
//                 <p className="text-lg">Making Vector Storage...</p>
//               )}
//               {mainLoading === "chain" && (
//                 <p className="text-lg">Making Conversational Chain... </p>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="w-full p-6">
//             <div className=" scrapped-content" style={{ overflow: "auto" }}>
//               {/* <button
//               type="button"
//               disabled={!session?.user?.email}
//               onClick={() => makeVectorStore()}
//               className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2     disabled:bg-gray-300"
//             >
//               Create Vector Store
//             </button> */}
//               <h2 className="text-2xl font-semibold mb-2">
//                 Chat with your File
//               </h2>
//               <textarea
//                 name="msgTxt"
//                 value={msgTxt}
//                 rows={5}
//                 className="w-full border border-gray-600 p-2 font-sans rounded-lg"
//                 onChange={(e) => setMsgTxt(e.target.value)}
//               ></textarea>
//               <button
//                 disabled={msgTxt === "" || loading || !session?.user?.email}
//                 onClick={handleSendMsg}
//                 className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2     disabled:bg-gray-300"
//               >
//                 {loading ? "Please wait.." : "Send"}
//               </button>
//               {streamedData && (
//                 <div className="m-4  rounded border p-4">
//                   <h1 className="text-4xl font-extrabold text-gray-900  mb-4">
//                     <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
//                       AI Response{" "}
//                     </span>
//                   </h1>
//                   <div
//                     className="font-sans whitespace-pre-wrap break-words"
//                     // style={{ textW: "auto" }}
//                   >
//                     {streamedData}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };
// export default ChatAI;

"use client";
import { getFilesForUser } from "@/helpers/getFilesForUser";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { date } from "yup";
const ChatAI = () => {
  const [userData, setUserData] = useState({});
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chatWithFile",
    body: userData,
  });

  const { data: session, status } = useSession();

  const getDataForChat = async () => {
    const data = await getFilesForUser(session?.user?.email);
    console.log(data);
    setUserData(data);
  };
  useEffect(() => {
    getDataForChat();
  }, []);

  return (
    <main className="mx-auto w-full h-screen max-w-lg p-24 flex flex-col">
      <section className="mb-auto m">
        {messages.map((m) => (
          <div className="mb-4" key={m.id}>
            {m.role === "user" ? "User: " : "AI Resume Bot: "}
            {m.content}
          </div>
        ))}
      </section>
      <form className="flex space-x-4" onSubmit={handleSubmit}>
        <input
          className="rounded-md p-2 text-black"
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />
        <button
          className="border-solid border-2 border-white p-2 rounded-md"
          type="submit"
        >
          Send
        </button>
      </form>
    </main>
  );
};

export default ChatAI;
