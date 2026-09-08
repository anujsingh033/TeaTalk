import React, { useContext, useEffect, useState } from "react";
import {
    Search,
    User,
    UserRoundPen,
    Plus,
    Home as HomeIcon,
    MessageCircle,
    Users,
    Settings,
    MoreVertical,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import moment from "moment";
import { setSelectedUser, setUserData, setOtherUserData } from "../redux/user.Slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Sidebar = () => {
    let { userData } = useSelector(state => state.user);
    let { onlineUser } = useSelector(state => state.user)
    let { serverUrl } = useContext(authDataContext);
    let { selectedUser } = useSelector(state => state.user);
    let { otherUserData } = useSelector(state => state.user);
    let [showSettings, setShowSettings] = useState(false);
    let [search, setSearch] = useState("");
    let [searchData, setSearchData] = useState([]);
    let dispatch = useDispatch()
    let navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true });
            dispatch(setUserData(null));
        } catch (error) {
            console.log(`handle signOut error ${error}`);
        }
    }
    const handleSearch = () => {
        const value = search.trim().toLowerCase();
        if (!value) {
            return setSearchData(null);
        }

        const users = otherUserData.filter(
            (user) =>
                user.name?.toLowerCase().includes(value) ||
                user.userName?.toLowerCase().includes(value)
        );

        setSearchData(users);
    };
    function comingSoon() {
        toast.warn("Feature Coming Soon !!!")
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch();
        }, 500);
        return () => {
            clearTimeout(timer);
        }
    }, [search])
    return (
        <aside className={`w-full h-screen bg-white border-r border-slate-200 ${!selectedUser ? `flex` : `hidden`} flex-col md:w-[30%] md:flex`}>

            {/* Logo */}
            <div className="px-5 py-5 border-b border-slate-100">

                <h1 className="text-2xl font-bold">
                    Tea<span className="text-indigo-600">Talk</span>
                </h1>

                <p className="text-xs text-slate-500 mt-1">
                    Every story has some tea.
                </p>

            </div>


            {/* Search */}
            <div className="p-4">

                <div className="flex gap-2">

                    <div className="relative flex-1">

                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50 outline-none text-sm  focus:ring-2 focus:ring-indigo-100"
                        />
                        {/* Search Data */}
                        {searchData?.length > 0 && <div className="flex-1  mt-2 absolute w-full z-99 ">
                            {searchData?.map((chat, index) => (

                                <div key={index} onClick={() => dispatch(setSelectedUser(chat))}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer mb-1 transition hover:bg-slate-400 bg-slate-200 border border-gray-200`}>

                                    {/* Avatar */}
                                    <div className="relative shrink-0">

                                        {chat?.profileImage ? (<img
                                            src={chat?.profileImage}
                                            alt={chat.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />) : (<User className="w-12 h-12 rounded-full bg-gray-300 text-gray-500" />)
                                        }

                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">

                                        <div className="flex justify-between">

                                            <p className="font-semibold text-sm truncate">
                                                {chat?.name || chat.userName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>}
                    </div>

                    <button onClick={() => navigate("/profile")} className="h-11 w-11 rounded-full cursor-pointer hover:scale-105 transition-all duration-200 border-2 overflow-hidden  flex items-center justify-center border-indigo-400">

                        {userData?.profileImage ? (<img src={userData.profileImage} alt="profileImage" className="w-full h-full object-cover" />) : (<User size={28} />)}
                    </button>
                </div>

            </div>


            {/* Chats Header */}
            <div className="px-5 pb-3 flex justify-between items-center">

                <h2 className="font-semibold text-sm">
                    Chats
                </h2>

                <button className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                    <Plus size={17} />
                </button>

            </div>


            {/* Chat List */}
            <div className="flex-1 overflow-y-auto px-3">

                {otherUserData.map((chat, index) => (

                    <div key={index} onClick={() => dispatch(setSelectedUser(chat))}
                        className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer mb-1 transition hover:bg-slate-100 border border-gray-200`}>

                        {/* Avatar */}
                        <div className="relative shrink-0">

                            {chat?.profileImage ? (<img
                                src={chat?.profileImage}
                                alt={chat.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />) : (<User className="w-12 h-12 rounded-full bg-gray-300 text-gray-500" />)
                            }
                            {/* {chat.online && (
                                <span className="absolute right-0 bottom-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
                            )} */}
                            {onlineUser?.includes(chat._id) && <span className="absolute right-0 bottom-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />}
                        </div>


                        {/* Content */}
                        <div className="flex-1 min-w-0">

                            <div className="flex justify-between">

                                <p className="font-semibold text-sm truncate">
                                    {chat?.name || chat.userName}
                                </p>

                                <span className="text-[11px] text-slate-400">
                                    {moment(chat.createdAt).fromNow()}
                                </span>

                            </div>

                            {/* <div className="flex items-center justify-between mt-1">

                                <p
                                    className={`text-xs truncate ${chat.message === "Typing..."
                                        ? "text-green-600"
                                        : "text-slate-500"
                                        }`}
                                >
                                    {chat.message}
                                </p>

                                {chat.unread && (
                                    <span className="ml-2 min-w-5 h-5 px-1 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center">
                                        {chat.unread}
                                    </span>
                                )}

                            </div> */}

                        </div>

                    </div>

                ))}

            </div>




            {/* Navigation */}
            <div className={`border-t border-slate-200 p-4 bg-white space-y-2 transition-all duration-300 ${showSettings ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}>
                <button onClick={() => navigate("/profile")} className={`w-full cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-indigo-50 text-indigo-600  hover:text-indigo-50 hover:bg-indigo-500 transition-all duration-150`}>
                    <UserRoundPen /> Edit Profile
                </button>
                <button onClick={comingSoon} className={`w-full cursor-pointer   flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-indigo-50 text-indigo-600  hover:text-indigo-50 hover:bg-indigo-500 transition-all duration-150`}>
                    <MessageCircle /> Message
                </button>
                <button onClick={comingSoon} className={`w-full  cursor-pointer flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-indigo-50 text-indigo-600  hover:text-indigo-50 hover:bg-indigo-500 transition-all duration-150`}>
                    <Users /> Private
                </button>

                <button onClick={handleSignOut} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer bg-indigo-50 text-red-500 hover:text-indigo-50 hover:bg-red-500`}>
                    <Settings /> Signout
                </button>
            </div>


            {/* Profile */}
            <div className="p-4 pt-0">

                <div className="border border-slate-200 rounded-xl p-3 flex items-center gap-3">

                    <button className="h-11 w-11 rounded-full border-2 overflow-hidden  flex items-center justify-center border-indigo-400">
                        {userData?.profileImage ? (<img src={userData.profileImage} alt="profileImage" className="w-full h-full object-cover" />) : (<User size={28} />)}
                    </button>

                    <div className="flex-1">

                        <p className="font-semibold text-sm">
                            {userData?.userName}
                        </p>

                        <p className="text-xs text-slate-500">
                            {userData?.email}
                        </p>

                    </div>

                    <MoreVertical
                        size={18}
                        className="text-slate-400 cursor-pointer hover:text-black"
                        onClick={() => setShowSettings((prev) => !prev)}
                    />

                </div>

            </div>

        </aside>
    );
};




export default Sidebar;