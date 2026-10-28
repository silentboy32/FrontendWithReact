
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_APP_URL, {
    withCredentials: true,
    autoConnect: false
});

socket.on("connect", () => {
    console.log("Real-time connection established");
});

socket.on("connect_error", (error) => {
    console.log("Real-time connection failed", error.message );
});


export default socket;