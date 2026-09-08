
import { useContext, useState } from "react";
import axios from "axios";
import {
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
    MessageCircle,
    User
} from "lucide-react";
import { Link } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/user.Slice";

const SignUp = () => {

    let [userName, setUserName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { serverUrl, loading, setLoading } = useContext(authDataContext);
    const navigate = useNavigate();
    let dispatch = useDispatch();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signup`, { userName, email, password }, { withCredentials: true });
            setEmail("");
            setUserName("");
            setPassword("");
            setLoading(false)
            toast.success("Account Created successfully!");
            dispatch(setUserData(result.data))
        } catch (error) {
            console.log(`Signup erorr ${error}`);
            toast.error(`${error.response.data.message}`);
            setLoading(false);
        }

    };

    return (

        <main className="h-screen overflow-hidden bg-[#f7f9fc]">

            <div className="mx-auto flex h-full max-w-7xl">

                {/* ================= LEFT SIDE ================= */}

                <section className="relative hidden w-[52%] overflow-hidden bg-[#eef4ff] lg:block">

                    {/* Soft background */}

                    <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />

                    <div className="absolute -bottom-40 -right-20 h-105 w-105 rounded-full bg-indigo-200/40 blur-3xl" />


                    {/* Logo */}

                    <div className="absolute left-12 top-10 flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">

                            <MessageCircle size={20} />

                        </div>

                        <span className="text-xl font-semibold tracking-tight text-gray-900">
                            TeaTalk
                        </span>

                    </div>


                    {/* Content */}

                    <div className="relative flex h-full flex-col justify-center px-16">

                        <p className="mb-4 text-sm font-medium tracking-wide text-blue-600">
                            TALK • SHARE • CONNECT
                        </p>

                        <h2 className="max-w-lg text-5xl font-semibold leading-[1.1] tracking-tight text-gray-900">

                            Every story has
                            <br />

                            <span className="text-blue-600">
                                some tea.
                            </span>

                        </h2>

                        <p className="mt-6 max-w-md text-base leading-7 text-gray-500">

                            Catch up with your friends, share
                            what's happening, and never miss
                            the conversation.

                        </p>


                        {/* Floating message cards */}

                        <div className="absolute bottom-20 right-16">


                            {/* Message 1 */}

                            <div

                                className="mb-4 w-64 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-lg shadow-blue-900/5 backdrop-blur"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-600">
                                        AS
                                    </div>

                                    <div>

                                        <p className="text-sm font-medium text-gray-800">
                                            Ankit
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            Online
                                        </p>

                                    </div>

                                    <span className="ml-auto h-2 w-2 rounded-full bg-green-500" />

                                </div>

                                <p className="mt-3 rounded-xl bg-gray-50 px-3 py-2 text-sm text-gray-600">
                                    Bro, you won't believe what happened 😂
                                </p>

                            </div>


                            {/* Message 2 */}

                            <div

                                className="ml-12 w-60 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-lg shadow-blue-900/5 backdrop-blur"
                            >

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-600">
                                        RK
                                    </div>

                                    <div>

                                        <p className="text-sm font-medium text-gray-800">
                                            Riya
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            Just now
                                        </p>

                                    </div>

                                </div>

                                <p className="mt-3 text-sm text-gray-600">
                                    Spill the tea ☕😂
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* ================= RIGHT SIDE ================= */}

                <section className="flex h-full w-full items-center justify-center bg-white px-5 lg:w-[48%]">

                    <div

                        className="w-full max-w-102 p-5 border-2 rounded-2xl border-gray-200 shadow-2xl"
                    >

                        {/* Mobile Logo */}

                        <div className="mb-10 flex items-center gap-2 lg:hidden">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">

                                <MessageCircle size={18} />

                            </div>

                            <span className="font-semibold text-gray-900">
                                TeaTalk
                            </span>

                        </div>


                        {/* Heading */}

                        <div className="mb-8">

                            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                                Join TeaTalk
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                Create an account and start the conversation.
                            </p>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={handleSignUp}
                            className="space-y-5"
                        >

                            {/* Username */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Username
                                </label>

                                <div className="relative">

                                    <User
                                        size={18}
                                        strokeWidth={1.8}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) =>
                                            setUserName(e.target.value)
                                        }
                                        placeholder="Enter your username"
                                        required
                                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all  hover:border-gray-300 focus:ring-4 focus:ring-blue-50"
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
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="you@example.com"
                                        required
                                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all  hover:border-gray-300 focus:ring-4 focus:ring-blue-50"
                                    />

                                </div>

                            </div>


                            {/* Password */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={18}
                                        strokeWidth={1.8}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Create a password"
                                        required
                                        className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-11 text-sm text-gray-900 outline-none transition-all  hover:border-gray-300 focus:ring-4 focus:ring-blue-50"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                                    >

                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}

                                    </button>

                                </div>

                            </div>


                            {/* Submit */}

                            <button
                                type="submit"
                                className="group flex h-12 w-full items-center cursor-pointer justify-center gap-2 rounded-xl bg-blue-600 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-all hover:-translate-y- hover:bg-blue-700 hover:shadow-md"
                            >

                                {loading ? "Creating..." : "Create account"}

                                <ArrowRight
                                    size={17}
                                    className="transition-transform duration-200 group-hover:translate-x-1"
                                />

                            </button>

                        </form>


                        {/* Sign In */}

                        <p className="mt-7 text-center text-sm text-gray-500">

                            Already have an account?{" "}

                            <Link
                                to="/signin"
                                className="font-medium text-blue-600 transition hover:text-blue-700 cursor-pointer"
                            >
                                Sign in
                            </Link>

                        </p>


                        {/* Terms */}

                        <p className="mt-8 text-center text-xs leading-5 text-gray-400">

                            By creating an account, you agree to our{" "}

                            <span className="text-gray-500">
                                Terms of Service
                            </span>{" "}

                            and{" "}

                            <span className="text-gray-500">
                                Privacy Policy
                            </span>

                            .

                        </p>

                    </div>

                </section>

            </div>

        </main>
    );
};

export default SignUp;

