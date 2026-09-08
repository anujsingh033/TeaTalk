import React, { useContext, useEffect, useRef, useState } from "react";
import { Coffee, MessageCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
    Phone,
    Video,
    MoreVertical,
    Paperclip,
    Smile,
    Send,
    Image,
    User,
    UserRoundPen,
    X,
    MoveLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setSelectedUser } from "../redux/user.Slice";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from "./SenderMessage";
import RecevierMessage from "./RecevierMessage";
import axios from "axios"
import { authDataContext } from "../context/AuthContext";
import getMessage from "../customHooks/GetMessage";
import { setMessageData, addMessageData } from "../redux/message.Slice";
import { toast } from "react-toastify";
const ChatArea = () => {
    let { userData, onlineUser } = useSelector(state => state.user);
    let { selectedUser, socket } = useSelector(state => state.user);
    let { messageData } = useSelector(state => state.message)
    let [showSettings, setShowSettings] = useState(false);
    let [showEmoji, setShowEmoji] = useState(false);
    let [input, setInput] = useState("");
    let [frontendImage, setFrontendImage] = useState(null);
    let [backendImage, setBackendImage] = useState(null);
    let [typing, setTyping] = useState(false);
    let image = useRef();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let { serverUrl } = useContext(authDataContext);
    getMessage();


    const addEmoji = (emojiData) => {
        setInput(prevInput => prevInput + emojiData.emoji);
    }

    const handleImage = (e) => {
        let file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file))
    }


    const handleSendMessage = async (e) => {
        e.preventDefault()
        if (input.length == 0) {
            return toast.warn("Please write some text !!!")
        }
        socket?.emit("stopTyping", {
            receiver: selectedUser._id
        });

        try {
            let formData = new FormData();
            formData.append("message", input);
            if (backendImage) {
                formData.append("image", backendImage);
            }
            let result = await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`, formData, { withCredentials: true });
            dispatch(addMessageData(result.data));
            setInput("");
            setFrontendImage(null);
            setBackendImage(null);
        } catch (error) {
            console.log("error from handle Send message ", error)
        }
    }

    const handleDeleteConversation = async () => {
        try {
            let result = await axios.delete(`${serverUrl}/api/message/delete/${selectedUser._id}`, { withCredentials: true });
            console.log(result.data);
            toast.success(result.data.message);
            dispatch(setMessageData([]));
        } catch (error) {
            console.log("error from handle delete conversation ", error)

        }
    }
    function comingSoon() {
        toast.warn("Feature Coming Soon !!!")
    }

    useEffect(() => {
        if (!socket) return;

        socket.on("newMessage", (mess) => {
            dispatch(addMessageData(mess));
        });

        return () => {
            socket.off("newMessage");
        };
    }, [socket, messageData, dispatch]);


    useEffect(() => {
        if (!socket || !selectedUser?._id || !input) {
            return;
        }
        socket.emit("typing", { receiver: selectedUser._id });

        const timer = setTimeout(() => {
            socket.emit("stopTyping", { receiver: selectedUser._id })
        }, 1000)
        return () => {
            clearTimeout(timer);
        }
    }, [input, socket, selectedUser]);

    useEffect(() => {
        if (!socket) {
            return
        }
        const handleTyping = ({ sender }) => {
            if (sender === selectedUser._id) {
                setTyping(true);
            }
        }
        const handleStopTyping = ({ sender }) => {
            if (sender === selectedUser?._id) {
                setTyping(false);
            }
        }
        socket.on("userTyping", handleTyping);
        socket.on("userStopTyping", handleStopTyping);

        return () => {
            socket.off("userTyping", handleTyping);
            socket.off("userStopTyping", handleStopTyping);
        }
    }, [socket, selectedUser]);
    return (
        <main className={`h-screen bg-white ${selectedUser ? "flex" : "hidden"} items-center justify-center flex w-full md:w-[70%] md:flex`}>

            {!selectedUser ? (<div className="text-center max-w-md px-6">

                <div className="w-28 h-28 mx-auto rounded-full bg-indigo-50 flex items-center justify-center mb-7">

                    <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center">

                        <Coffee
                            size={42}
                            strokeWidth={1.5}
                            className="text-indigo-600"
                        />

                    </div>

                </div>


                <h2 className="text-3xl font-bold">
                    Welcome {" "}
                    <span className="text-indigo-600 capitalize">
                        {userData?.name ? userData.name : userData.userName} !!!
                    </span>
                </h2>


                <p className="text-indigo-600 font-medium mt-2">
                    Every story has some tea.
                </p>


                <p className="text-slate-500 leading-7 mt-6">
                    Connect with your friends, share what's happening
                    and spill some tea.
                </p>


                <button className="mt-7 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm flex items-center gap-2 mx-auto hover:bg-indigo-700 transition">
                    <MessageCircle size={18} />
                    Start Chatting
                </button>


                <p className="text-xs text-slate-400 mt-4">
                    Select a conversation to start messaging
                </p>

            </div>)
                :
                (<div className="flex-1 h-screen bg-slate-50 flex flex-col">
                    <div className="h-18 bg-white border-b border-slate-200 px-5 flex items-center justify-between relative">

                        {/* User */}
                        <div className="flex items-center gap-3">
                            <div onClick={() => dispatch(setSelectedUser(null))} className="cursor-pointer flex items-center justify-center text-slate-500 rounded-full w-10 h-10 hover:bg-slate-100 transition duration-150">
                                <MoveLeft size={22} />
                            </div>
                            <div className="relative">
                                <button className="h-15 w-15 rounded-full border-2 overflow-hidden  cursor-pointer flex items-center justify-center border-indigo-400">
                                    {selectedUser?.profileImage ? (<img src={selectedUser.profileImage} alt="profileImage" className="w-full h-full object-cover" />) : (<User size={28} />)}
                                </button>

                                {onlineUser?.includes(selectedUser._id) ? <span className="absolute right-0 bottom-1 w-3 h-3 rounded-full bg-green-500 border-2 border-white" /> : <span className="absolute right-0 bottom-1 w-3 h-3 rounded-full bg-gray-500 border-2 border-white" />}

                            </div>


                            <div>

                                <h2 className="text-lg capitalize font-semibold">
                                    {selectedUser?.name ? selectedUser.name : selectedUser.userName}
                                </h2>

                                {onlineUser?.includes(selectedUser._id) ? < p className="text-xs text-green-500 mt-0.5">Online</p> : <p className="text-xs text-gray-500 mt-0.5">Offline</p>}

                            </div>

                        </div>


                        {/* Header Actions */}
                        <div className="flex items-center gap-1">

                            <button onClick={comingSoon} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition">
                                <Phone
                                    size={19}
                                    className="text-slate-500"
                                />
                            </button>

                            <button onClick={comingSoon} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition">
                                <Video
                                    size={20}
                                    className="text-slate-500"
                                />
                            </button>

                            <button onClick={() => setShowSettings((prev) => !prev)} className="w-10 h-10 cursor-pointer  rounded-full flex items-center justify-center hover:bg-slate-100 transition">
                                <MoreVertical
                                    size={20}
                                    className="text-slate-500"
                                />
                            </button>

                        </div>

                        {/* Navigation */}
                        <div className={`absolute top-20 right-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50 transition-all duration-300 origin-top-right cursor-pointer
                            ${showSettings ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
                            <button
                                onClick={() => navigate("/profile")}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                            >
                                <UserRoundPen size={18} />
                                <span>View Profile</span>
                            </button>
                            <button
                                onClick={handleDeleteConversation}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                            >
                                <MessageCircle size={18} />
                                <span>Clear Chat</span>
                            </button>
                            <button
                                onClick={comingSoon}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer"
                            >
                                <User size={18} />
                                <span>Private</span>
                            </button>
                            <div className="my-2 border-t border-slate-100" />
                            <button
                                onClick={() => setShowSettings(false)}
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-red-500 transition-colors hover:text-white cursor-pointer"
                            >
                                <X size={18} />
                                <span>Close</span>
                            </button>

                        </div>
                    </div>

                    {/* ================= MESSAGES ================= */}

                    <div className="flex-1 overflow-scroll scrollbar-none px-5 py-6 ">

                        <div className="max-w-4xl mx-auto space-y-3">

                            {/* Date */}
                            <div className="flex justify-center mb-5">

                                <span className="text-[11px] text-slate-400 bg-white border border-slate-200 px-3 py-1 rounded-full">
                                    Today
                                </span>

                            </div>
                            {messageData.map((mess, index) => (
                                mess.sender == userData._id ? <SenderMessage key={index} image={mess.image} messages={mess.message} time={mess.createdAt} /> : <RecevierMessage key={index} time={mess.createdAt} image={mess.image} messages={mess.message} />
                            ))}

                            {typing && <div className="flex justify-start mt-2">

                                <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">

                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />

                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />

                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />

                                </div>

                            </div>}






                        </div>

                    </div>


                    {/* ================= MESSAGE INPUT ================= */}

                    <div className="bg-white border-t border-slate-200 p-4 ">

                        <form
                            onSubmit={handleSendMessage}
                            className="max-w-4xl mx-auto"
                        >

                            <div className="flex items-center gap-2">


                                {/* Attachment */}

                                <button
                                    type="button"
                                    className=" w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-100 transition"
                                >
                                    {frontendImage ? (<img src={frontendImage} alt="img" className="w-15 h-15 rounded-full" />) : (<Paperclip
                                        size={20}
                                        className="text-slate-500"
                                    />)}
                                </button>


                                {/* Image */}

                                <button
                                    onClick={() => image.current.click()}
                                    type="button"
                                    className=" cursor-pointer flex  w-10 h-10 rounded-full items-center justify-center hover:bg-slate-100 transition"
                                >
                                    <Image
                                        size={20}
                                        className="text-slate-500"
                                    />
                                </button>


                                {/* Input */}

                                <div className="flex-1 relative">

                                    <input
                                        type="text"
                                        onChange={(e) => setInput(e.target.value)}
                                        value={input}
                                        placeholder="Write a message..."
                                        className="w-full h-11 px-4 pr-11 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm  focus:ring-2 focus:ring-indigo-100 transition"
                                    />

                                    <input type="file" accept="image/*" hidden ref={image} onChange={handleImage} />

                                    {/* Emoji */}

                                    <button
                                        onClick={() => setShowEmoji((prev) => !prev)}
                                        type="button"
                                        className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-200 transition"
                                    >
                                        <Smile
                                            size={19}
                                            className="text-slate-500"
                                        />
                                    </button>

                                </div>


                                {/* Send */}

                                <button
                                    type="submit"

                                    className="w-11 h-11 cursor-pointer rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-40 transition"
                                >
                                    <Send size={18} />
                                </button>

                            </div>

                        </form>

                    </div>
                    {showEmoji && <div className="absolute bottom-20 right-2">
                        <EmojiPicker width={300} height={350} onEmojiClick={addEmoji} className="shadow-xl" />
                    </div>}
                </div>)
            }
        </main >
    );
};

export default ChatArea;