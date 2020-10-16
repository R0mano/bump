const io = require('socket.io')();
const Message = require('../models/message');
//const messageCtrl = require('../controllers/messages')

const users = {};

io.on('connection', socket => {
  socket.on("sign-on", username => {
    console.log(socket._id, 'User has connected');
    const user = {
      name: username,
      id: socket.id
    };
    users[socket.id] = user;
    io.emit("connected", user);
    io.emit("users", Object.values(users));
  });
  ///
  Message.find({}).sort({createdAt: -1})
    .limit(10).exec((err, messages) => {
      socket.emit('init', messages);
    })
  ///
  socket.on('message', (msg) => {
    console.log(msg, ' msg inside io.js');
    socket.broadcast.emit('push', msg);
  });
  socket.on('disconnect', () => {
    delete users[socket.id]
    io.emit('disconnected', socket.id)
  });
});


module.exports = io;