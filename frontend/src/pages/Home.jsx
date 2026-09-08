import React from "react";
import Sidebar from "../components/SideBar";
import ChatArea from "../components/ChatArea";



const Home = () => {
    return (
        <div className="h-screen w-full flex bg-slate-50 overflow-hidden">
            <Sidebar />
            <ChatArea />
        </div>
    );
};

export default Home;