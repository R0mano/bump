const io = require('socket.io')();
const Message = require('../models/message');

const users = {};

console.log('we are in io.js')

io.on('connection', socket => {
  const profileId = socket.handshake.query.profileId
  // console.log(profileId, ' <----socket.handshake.query.profileId received io.on(connection)')
  Message.find( { $or: [{ 'from': profileId }, {'to': profileId}] } ).sort({createdAt: -1})
  .limit(500).exec((err, msg) => {
    // console.log(msg, ' All messages retrieved from the query')
    // console.log(msg.length, ' Number of messages retrieved from the query')
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