const io = require('socket.io')();
const Message = require('../models/message');

const users = {};

console.log('we are in io.js')

io.on('connection', socket => {
  Message.find({}).sort({createdAt: -1})
    .limit(100).exec((err, msg) => {
      socket.emit('init', msg);
    })
  socket.on('message', async (msg) => {
    const newMessage = await Message.create(msg)
    socket.broadcast.emit('push', newMessage);
  });
  socket.on('disconnect', () => {
    delete users[socket.id]
    io.emit('disconnected', socket.id)
  });
});


module.exports = io;