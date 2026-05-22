import React, { useEffect } from 'react'
import { useSocketContext } from '../Context/SocketContext'
import useConversation from '../Zustand/useConversation.js'
import sound from "../assets/notification.mp3"

const useGetsocketMessage = () => {
    const { socket } = useSocketContext()        // ✅ call as function, destructure socket
    const { messages, setMessages } = useConversation()  // ✅ call as function

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
          const notification= new Audio(sound)
          notification.play()
            setMessages([...messages, newMessage]);  // ✅ setMessages not setMessage
        });
        return () => {
            socket?.off("newMessage");
        };
    }, [socket, messages, setMessages]);
};

export default useGetsocketMessage