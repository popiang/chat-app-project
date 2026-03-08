import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// create the server explicitly so it can be attach to socket.io
const server = http.createServer(app);

// attach socket io to the server
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// to store active online users in map
const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("A user connected ", socket.id);

	// socket io from the client send the userId 
    const userId = socket.handshake.query.userId;

	// store the socket id to the map
    if (userId) {
        userSocketMap[userId] = socket.id;
    }

	// this part will send the list of online users to all active online users
	// for example, if i'm online, i will get a list of all other online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected ", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };
