const io = require("socket.io")();
const Message = require("../models/message");

const users = {};

console.log("Connected to socket.io()");

io.on("connection", (socket) => {
    socket.on("retrieve-messages", async (query) => {
        Message.find({ $or: [{ from: query.profileId }, { to: query.profileId }] })
            .sort({ createdAt: -1 })
            .limit(500)
            .exec((err, msg) => {
                if (err) {
                    console.log(`Error in io.js. ${err}`);
                }
                socket.emit("init", msg);
                // console.log(`${msg}, <------- ${msg.length} messages retrieved`)
            });
        });

        socket.on("message", async (msg) => {
            const newMessage = await Message.create(msg);
            socket.broadcast.emit("push", newMessage);
        });

        socket.on("disconnect", () => {
            delete users[socket.id];
            io.emit("disconnected", socket.id);
        });
});

module.exports = io;
