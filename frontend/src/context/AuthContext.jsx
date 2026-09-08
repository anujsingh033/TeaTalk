import { createContext, useState } from "react";
export const authDataContext = createContext();
function AuthContext({ children }) {
    let serverUrl = "https://teatalk-backend.onrender.com";
    let [loading, setLoading] = useState(false);
    let [err, setErr] = useState(false);
    let data = { serverUrl, loading, setLoading };
    return (
        <>
            <authDataContext.Provider value={data}>
                {children}
            </authDataContext.Provider>
        </>
    )
}

export default AuthContext;