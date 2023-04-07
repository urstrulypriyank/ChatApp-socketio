import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { nanoid } from "nanoid";
const inter = Inter({ subsets: ["latin"] });

const socket = io("http://localhost:3000");

const userName = nanoid(4);
export default function Home() {
  const [message, setMessge] = useState("");
  const [chat, setChat] = useState([]);
  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {
      message,
      userName,
    });
    setMessge("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });
  return (
    <div className=" flex flex-col w-screen h-screen ">
      <div className="p-5 w-screen fixed bg-green-500 text-black ">
        <h1 className="text-center justify-center w-full">My Chat App</h1>
      </div>
      {/* Chat Area */}
      <div className="flex w-screen justify-center mt-20  ">
        {/* chatBox */}
        <div className="w-[80vw] border border-green-500 h-screen overflow-y-scroll overflow-hidden flex flex-col">
          {chat.map((payload, index) => {
            return (
              <p key={index}>
                Message: {payload.message} {" || "}
                <span>id: {payload.userName}</span>
              </p>
            );
          })}
        </div>
      </div>

      {/* chat Input Area */}
      <div className="flex w-screen justify-center fixed bottom-1   ">
        <form onSubmit={sendChat}>
          <input
            type="text"
            name=""
            id=""
            className="border relative text-black rounded-2xl border-white w-[70vw] py-2  "
            value={message}
            onChange={(e) => {
              setMessge(e.target.value);
            }}
          />
          <button
            type="submit"
            className="bg-green-500 p-3 m-3 rounded-lg w-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
