import { useContext, useEffect } from "react";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setMessageData } from "../redux/message.Slice";

const getMessage = () => {
    const { serverUrl } = useContext(authDataContext);

    const dispatch = useDispatch();

    const { selectedUser } = useSelector(
        (state) => state.user
    );

    useEffect(() => {

        if (!selectedUser?._id) {
            return;
        }

        const fetchMessage = async () => {
            try {
                const result = await axios.get(
                    `${serverUrl}/api/message/get/${selectedUser._id}`,
                    {
                        withCredentials: true
                    }
                );

                dispatch(setMessageData(result.data));



            } catch (error) {
                console.log(
                    "Get message error:",
                    error.response?.data || error.message
                );
            }
        };

        fetchMessage();

    }, [selectedUser, serverUrl, dispatch]);
};

export default getMessage;