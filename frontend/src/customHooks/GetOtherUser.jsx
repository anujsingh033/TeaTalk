import { useContext, useEffect } from "react"
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUserData } from "../redux/user.Slice";
const getOtherUser = () => {
    let { serverUrl } = useContext(authDataContext);
    let dispatch = useDispatch()
    let { userData } = useSelector(state => state.user)
    useEffect(() => {
        const fetchOtherUser = async () => {
            try {
                let result = await axios.get(`${serverUrl}/api/user/getotheruser`, { withCredentials: true });
                dispatch(setOtherUserData(result.data));

            } catch (error) {
                console.log(`get OtherUser error ${error}`);
            }
        }
        fetchOtherUser();
    }, [userData]);
}

export default getOtherUser;