import React, { useEffect, useRef, useState } from 'react'
import momemt from "moment";
import { useSelector } from 'react-redux';
function SenderMessage({ image, messages, time }) {
    let scroll = useRef();

    let { socket, selectedUser } = useSelector(state => state.user);
    const handleImageScroll = () => {
        scroll?.current.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(() => {
        scroll?.current.scrollIntoView({ behavior: "smooth" });
    }, [messages, image]);


    return (
        <div className='w-fit rounded-br-none rounded-2xl max-w-100  relative left-0  ml-auto flex flex-col gap-2 shadow-2xl
                       text-md font-light text-slate-600 bg-white border border-slate-200 min-h-10 px-5 py-2 '>
            <div ref={scroll} className='flex flex-col '>
                {image && <div>
                    <img src={image} alt="image" className='w-60 rounded-2xl' onLoad={handleImageScroll} />
                </div>}
                {messages && <span>{messages} </span>}
                {time && <span className='text-[8px] text-right text-gray-400'>{momemt(time).fromNow()}</span>}
            </div>
        </div>

    )
}

export default SenderMessage