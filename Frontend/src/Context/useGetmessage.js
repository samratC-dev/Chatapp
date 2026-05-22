import React, { useEffect, useState } from "react";

import axios from "axios";
import useConversation from "../Zustand/useConversation";
const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      console.log("selectedConversation:", selectedConversation); // add this
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          )
          console.log("messages response:", res.data); // add this
          setMessages(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessages])
  
  return { loading, messages}
};

export default useGetMessage;