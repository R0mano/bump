const io = require('socket.io')();
const Message = require('../models/message');

const users = {};
let profileId;

console.log('Connected to socket.io()')

io.on('connection', socket => {
  console.log('connected to socket')

  profileId = socket.handshake.query.profileId

  if(profileId) {
    Message.find( { $or: [{ 'from': profileId }, {'to': profileId}] } ).sort({createdAt: -1})
    .limit(500).exec((err, msg) => {
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
  }
});


module.exports = io;