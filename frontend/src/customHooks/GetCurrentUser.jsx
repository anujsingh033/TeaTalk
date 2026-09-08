import { useContext, useEffect } from "react"
import axios from "axios";
import { authDataContext } from "../context/AuthContext"
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/user.Slice";
const getCurrentUser = () => {
    let { serverUrl } = useContext(authDataContext)
    let dispatch = useDispatch();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/user/currentuser`, { withCredentials: true });
                dispatch(setUserData(result.data));
            } catch (error) {
                console.log(`getCurrent user error ${error}`);
            }
        }
        fetchUser();
    }, [])
}

export default getCurrentUser;