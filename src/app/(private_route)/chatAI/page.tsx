"use client";
import { getFilesForUser } from "@/helpers/getFilesForUser";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
