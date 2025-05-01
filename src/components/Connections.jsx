import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.error("Error fetching connections:", err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return null;

    if (connections.length === 0)
        return (
            <div className="text-center mt-10 text-xl text-gray-600">
                No connections found
            </div>
        );

    return (
        <div className="max-w-2xl mx-auto mt-10 px-4">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Connections
            </h2>
            <div className="space-y-4">
                {connections.map((connection) => {
                    const from = connection.fromUserId;
                    const to = connection.toUserId;

                    return (
                        <div
                            key={connection._id}
                            className="p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-50 transition"
                        >
                            <p className="text-gray-700 font-medium">
                                {from?.firstName} {from?.lastName} {to?.firstName} {to?.lastName}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Connections;
