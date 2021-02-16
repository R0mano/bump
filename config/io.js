const io = require("socket.io")();
const Message = require("../models/message");

const users = {};
// let profileId;

console.log("Connected to socket.io()");

io.on("connection", (socket) => {
    console.log("socket connected...");
    // console.log(users, " socket.io {users}");

    // profileId = socket.handshake.query.profileId;

    socket.on("retrieve-messages", async (query) => {
        console.log('retrieving messages....')
        Message.find({ $or: [{ from: query.profileId }, { to: query.profileId }] })
            .sort({ createdAt: -1 })
            .limit(500)
            .exec((err, msg) => {
                if (err) {
                    console.log(`Error in io.js. ${err}`);
                }
                socket.emit("init", msg);
                console.log(`${msg}, <------- ${msg.length} messages retrieved`)
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
