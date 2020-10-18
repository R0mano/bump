const io = require('socket.io')();
const Message = require('../models/message');
//const messageCtrl = require('../controllers/messages')

const users = {};

io.on('connection', socket => {
  Message.find({}).sort({createdAt: -1})
    .limit(100).exec((err, msg) => {
      console.log(msg, ' Messages in socket.io init');
      socket.emit('init', msg);
    })
  ///
  socket.on('message', async (msg) => {
    console.log(msg, ' msg inside io.js');
    const newMessage = await Message.create(msg)
    socket.broadcast.emit('push', newMessage);
  });
  socket.on('disconnect', () => {
    delete users[socket.id]
    io.emit('disconnected', socket.id)
  });
});


module.exports = io;