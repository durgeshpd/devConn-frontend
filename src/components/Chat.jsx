import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((store) => store.user);
    const userId = user?._id;

    useEffect(() => {
        if (!userId) return;

        const socket = createSocketConnection();

        socket.emit("joinChat", {
            firstName: user.firstName,
            userId,
            targetUserId,
            avatar: user.photoUrl,
        });

        socket.on("messageReceived", ({ firstName, text, avatar }) => {
            setMessages((prev) => [...prev, { firstName, text, avatar }]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        const socket = createSocketConnection();

        socket.emit("sendMessage", {
            firstName: user.firstName,
            userId,
            targetUserId,
            text: newMessage,
            avatar: user.photoUrl,
        });

        setNewMessage("");
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-4">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                DevConn Chat
            </h2>

            <div className="bg-white shadow-lg rounded-xl p-4 h-96 overflow-y-auto space-y-4 border border-gray-200">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat ${
                            msg.firstName === user.firstName ? "chat-end" : "chat-start"
                        }`}
                    >
                        <div className="chat-image avatar">
                            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    alt="user avatar"
                                    src={msg.avatar || "https://via.placeholder.com/40"}
                                />
                            </div>
                        </div>
                        <div className="chat-header text-sm text-gray-600 mb-1">
                            {msg.firstName}
                        </div>
                        <div
                            className={`chat-bubble ${
                                msg.firstName === user.firstName
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            } transition duration-300 ease-in-out`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-center gap-2">
                <input
                    type="text"
                    className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    className="btn btn-primary px-6 transition transform hover:scale-105"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
