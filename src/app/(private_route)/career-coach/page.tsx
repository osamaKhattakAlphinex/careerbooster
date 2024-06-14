"use client";
import { getFilesForUser } from "@/helpers/getFilesForUser";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { makeid } from "@/helpers/makeid";
import logo from "@/../public/trans-icon1.png";
import Image from "next/image";

const ChatAI = () => {
  const [userData, setUserData] = useState<any>({});
  const [chat, setChat] = useState<any>([]);
  const [exampleQuestions, setExampleQuestions] = useState<boolean>(true);
  const messagesContainer: any = useRef(null);
  const handleStop = async () => {
    const obj: any = {
      chatData: chat,
      email: userData.email,
    };
    console.log(obj);
    const res = await fetch("/api/chatCompletion", {
      method: "POST",
      body: JSON.stringify(obj),
    });
  };

  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
      api: "/api/chatWithFile",
      body: {
        email: userData.email,
      },
      initialMessages: [
        {
          id: makeid(),
          role: "user",
          content: JSON.stringify(userData).substring(0, 10000),
        },
      ],
    });
  // console.log("handleInputChange",handleInputChange);

  const { data: session, status } = useSession();
  const formRef = useRef<any>(null);
  const getDataForChat = async () => {
    const data = await getFilesForUser(session?.user?.email);
    setUserData({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      contact: data.contact,
      skills: data.skills,
      education: data.education,
      files: data?.uploadedResume?.fileContent
        ? data.uploadedResume.fileContent
        : data.files[0],
      // files: data.files[0],
    });
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   setInput("");
  //   setChat((prev: any) => [
  //     ...prev,
  //     {
  //       id: makeid(),
  //       role: "user",
  //       content: input,
  //     },
  //   ]);
  //   const obj: any = {
  //     email: userData.email,
  //     message: input,
  //     userData: JSON.stringify(userData).substring(0, 10000),
  //   };
  //   console.log(obj);
  //   await fetch("/api/chatCompletion", {
  //     method: "POST",
  //     body: JSON.stringify(obj),
  //   }).then(async (res) => {
  //     const response = await res.json();
  //     console.log(response);
  //     setChat((prev: any) => [...prev, response.result]);
  //   });
  // };
  const getPreviosChat = async () => {
    const obj: any = {
      email: userData.email,
    };
    await fetch("/api/chatCompletion", {
      method: "POST",
      body: JSON.stringify(obj),
    }).then(async (res) => {
      const response = await res.json();
      setChat(response.result);
    });
  };

  useEffect(() => {
    getDataForChat();
  }, []);
  // useEffect(() => {
  //   // getPreviosChat();
  // }, [userData]);
  const scrollToBottom = () => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop =
        messagesContainer.current.scrollHeight;
    }
  };

  // useEffect(() => {
  //   scrollToBottom();

  // }, [chat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleJobsClick = (e: any) => {
    e.preventDefault();
    const content = " Suggest me some jobs according to my resume.";
    setInput(content);
    setExampleQuestions(false);

    // handleSubmit(e);
  };
  const handleInteractiveSummaryClick = (e: any) => {
    e.preventDefault();
    const content =
      "Make me an interactive professional summary based on my resume.";
    setInput(content);
    setExampleQuestions(false);
    // handleSubmit(e);
  };

  return (
    <>
      <div className="w-full sm:w-full z-1000 my-2">
        <div className="ml-0 lg:ml-[234px] px-[15px]">
          {/* <Link
            href="/dashboard"
            className="ml-2 no-underline px-[15px] text-[#B324D7] flex flex-row gap-2 items-center hover:text-[#E6F85E] hover:opacity-80 transition-all"
          >
            {leftArrowIcon}
            Back
          </Link> */}
          <div className="w-full h-[76vh] py-2 flex flex-col items-center rounded-xl dark:bg-[#17151b] dark:text-white bg-[#00000015] text-gray-950 ">
            <section
              ref={messagesContainer}
              className="flex h-20 px-3 py-3 md:px-0 w-full flex-col gap-6 md:w-9/12  flex-1 overflow-y-scroll no-scrollbar "
            >
              {/* {m.role === "user" ? "User: " : "AI Resume Bot: "} */}
              {messages[1]?.content === undefined ||
                messages[1]?.content === "" ? (
                <div className="flex flex-col justify-center items-center  w-full h-full">
                  <Image src={logo} alt="" className="h-24 w-24 " />
                  <div className="mb-5 text-lg card-h2 md:text-2xl font-medium">
                    How can I help you today?
                  </div>
                </div>
              ) : (
                messages?.slice(1).map((m: any) => (
                  <div className="flex flex-row items-start gap-2" key={m.id}>
                    {m.role === "user" ? (
                      <div className="flex flex-row items-start gap-2 w-full">
                        <div className="w-9 h-9 bg-[#756f6f] rounded-full flex justify-center items-center text-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                            fill="currentColor"
                            className="h-4 w-4 rounded-full"
                          >
                            <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z"></path>
                          </svg>
                        </div>
                        <div className="w-fit ml-1 mt-1 text-white p-2 bg-[#414141]  rounded-2xl border-tl-0  ">
                          {m.content.length > 0 ? m.content : "Log"}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-row items-start gap-2  w-full">
                        <div className="w-9 h-9 bg-white rounded-full flex justify-center items-center text-center">
                          {/* <svg
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                            >
                              <title>OpenAI icon</title>
                              <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"></path>
                            </svg> */}
                          <Image
                            src={logo}
                            alt=""
                            className="w-9 h-9 rounded-full"
                          />
                        </div>
                        <div className="w-fit ml-1 mt-1 text-white p-2 bg-gradient-to-r from-[#556af0] to-[#1635ff] rounded-2xl border-tl-0  ">
                          {m.content}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
              {exampleQuestions && (
                <div className="w-full px-3 gap-2 flex flex-col md:flex-row cursor-pointer">
                  <div
                    onClick={handleInteractiveSummaryClick}
                    className="w-full rounded-md bg-transparent border-[1px] border-[#404044] p-2 card-h2"
                  >
                    Make me an interactive professional summary based on my
                    resume.
                  </div>

                  <div
                    className="w-full rounded-md bg-transparent mb-1 md:mb-0 border-[1px] border-[#404044] p-2 card-h2"
                    onClick={handleJobsClick}
                  >
                    Suggest me some jobs according to my resume.
                  </div>
                </div>
              )}
            </section>

            <form
              // ref={formRef}
              className="space-x-4 px-3 w-full md:w-9/12 flex flex-row justify-between items-center"
              onSubmit={handleSubmit}
            >
              <input
                className="w-full rounded-md bg-transparent  outline-none border-[1px] border-[#404044]  p-2 h-10 card-h2"
                value={input}
                // onChange={(e) => {
                //   e.preventDefault();
                //   setInput(e.target.value);
                // }}
                name="input"
                onChange={handleInputChange}
                placeholder="Say something..."
              />
              {/* <button type="button" onClick={handleStop}>
                Stop
              </button> */}
              <button
                ref={formRef}
                className="border-solid border-[1px] border-[#404044] h-10 text-btn p-2 rounded-md"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatAI;
