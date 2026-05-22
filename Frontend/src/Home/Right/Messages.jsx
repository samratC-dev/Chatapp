import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import useGetMessage from "../../Context/useGetmessage";
import Loading from "../../Components/Loading";
import useGetsocketMessage from "../../Context/useGetsocketMessage.jsx";

function Messages() {
  const { loading, messages } = useGetMessage()
  useGetsocketMessage()

  const lastMsgRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }, 100);
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto">
      {loading ? (
        <Loading />
      ) : messages.length > 0 ? (
        messages.map((message) => (
          
          <div key={message._id} ref={lastMsgRef}>
            <Message message={message} />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-center text-sm">
            Say Hi! to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;