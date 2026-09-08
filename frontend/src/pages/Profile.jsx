
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import gsap from "gsap";
import {
    Camera,
    Mail,
    User,
    AtSign
} from "lucide-react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { setUserData } from "../redux/user.Slice";

const Profile = () => {

    const { userData } = useSelector((state) => state.user);
    const { serverUrl, loading, setLoading } = useContext(authDataContext)
    const profileRef = useRef(null);
    const [name, setname] = useState("");
    const [frontendProfileImage, setFrontendProfileImage] = useState(userData.profileImage || null);
    const [backendProfileImage, setBackendProfileImage] = useState(null);
    const navigate = useNavigate()
    let dispatch = useDispatch();

    useEffect(() => {

        if (userData) {
            setname(userData.name || "");
        }

    }, []);


    useEffect(() => {

        gsap.fromTo(
            profileRef.current,
            {
                opacity: 0,
                y: 25
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }
        );

    }, []);


    const handleImageChange = (e) => {

        const file = e.target.files[0];
        if (!file) return;
        setBackendProfileImage(file);
        setFrontendProfileImage(URL.createObjectURL(file));

    };


    const handleEditProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let formData = new FormData();
            formData.append("name", name);
            if (backendProfileImage) {
                formData.append("image", backendProfileImage);
            }
            let result = await axios.put(`${serverUrl}/api/user/editprofile`, formData, { withCredentials: true });
            dispatch(setUserData(result.data));
            setLoading(false);
            navigate("/")
        } catch (error) {

            console.log(
                "handle editProfile error:",
                error.response?.data || error.message
            );

            setLoading(false);

        }
    };


    if (!userData) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#f7f9fc]">
                <p className="text-sm text-gray-500">
                    Loading profile...
                </p>
            </div>
        );
    }


    return (

        <main className="h-screen overflow-hidden bg-[#f7f9fc]">

            <div className="flex h-full items-center justify-center px-4">

                <div
                    ref={profileRef}
                    className="w-full max-w-2xl"
                >

                    {/* Header */}

                    <div className="mb-7 flex flex-row gap-3 items-center">
                        <IoArrowBackCircleOutline size={40} onClick={() => navigate("/")} className="cursor-pointer hover:text-gray-500 transition-all duration-150" />
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                                Profile
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage your profile information.
                            </p>
                        </div>

                    </div>


                    {/* Card */}

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">


                        {/* Profile Header */}

                        <div className="border-b border-gray-100 px-7 py-6">

                            <div className="flex items-center gap-5">

                                {/* Profile Image */}

                                <div className="relative">

                                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-blue-50">

                                        {frontendProfileImage || userData.profileImage ? (

                                            <img
                                                src={
                                                    frontendProfileImage ||
                                                    userData.profileImage
                                                }
                                                alt="Profile"
                                                className="h-full w-full object-cover"
                                            />

                                        ) : (

                                            <User
                                                size={38}
                                                strokeWidth={1.5}
                                                className="text-blue-500"
                                            />

                                        )}

                                    </div>


                                    {/* Upload button */}

                                    <label
                                        htmlFor="profileImage"
                                        className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-sm transition hover:bg-blue-700"
                                    >

                                        <Camera size={15} />

                                    </label>

                                    <input
                                        id="profileImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />

                                </div>


                                <div>

                                    <h2 className="text-lg font-medium text-gray-900">
                                        {userData.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Update your profile picture and information.
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={handleEditProfile}
                            className="space-y-5 px-7 py-7"
                        >

                            {/* Name */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Name
                                </label>

                                <div className="relative">

                                    <User
                                        size={18}
                                        strokeWidth={1.8}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) =>
                                            setname(e.target.value)
                                        }
                                        placeholder="Enter your name"
                                        className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 outline-none transition  focus:ring-4 focus:ring-blue-50"
                                    />

                                </div>

                            </div>


                            {/* Email */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Email address
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={18}
                                        strokeWidth={1.8}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="email"
                                        value={userData.email || ""}
                                        readOnly
                                        className="h-12 w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-500 outline-none"
                                    />

                                </div>

                                <p className="mt-1.5 text-xs text-gray-400">
                                    Email address cannot be changed.
                                </p>

                            </div>


                            {/* name */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    name
                                </label>

                                <div className="relative">

                                    <AtSign
                                        size={18}
                                        strokeWidth={1.8}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        value={userData.userName || ""}
                                        readOnly
                                        className="h-12 w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-500 outline-none"
                                    />

                                </div>

                                <p className="mt-1.5 text-xs text-gray-400">
                                    name cannot be changed.
                                </p>

                            </div>


                            {/* Buttons */}

                            <div className="flex justify-end border-t border-gray-100 pt-6">

                                <button
                                    type="submit"
                                    className="rounded-xl cursor-pointer bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-md"
                                >
                                    {loading ? "Saving..." : "Save changes"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </main>
    );
};

export default Profile;
