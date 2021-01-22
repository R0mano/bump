const io = require('socket.io')();
const Message = require('../models/message');

const users = {};

console.log('we are in oi.js')

io.on('connection', socket => {
  // console.log('Socket.io has connected')
  Message.find({}).sort({createdAt: -1})
    .limit(100).exec((err, msg) => {
      socket.emit('init', msg);
      // console.log('Socket.io has initiated')
    })
  socket.on('message', async (msg) => {
    const newMessage = await Message.create(function (err) {
      if (err) {
        console.log(err)
      }
    })
    console.log('newMessaged received from sender by the server')
    socket.broadcast.emit('push', newMessage);
    console.log(`newMessaged: ${newMessage} sent by server to recipient`)
  });
  socket.on('disconnect', () => {
    delete users[socket.id]
    io.emit('disconnected', socket.id)
  });
});


module.exports = io;