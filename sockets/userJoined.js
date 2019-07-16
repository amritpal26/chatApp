const User = require('../models/models');

module.exports = (io, socket) => {
    socket.on('join_user', async (user) => {
        const onlineUser = new User({socketId: socket.socketId, nickname: user.nickname});
        await onlineUser.save();

        // get Online Users
        const onlineUsers = await User.find({}).where('__id').ne(onlineUser.__id);
        
        // send to current user who joined.
        socket.emit('user_joined', {onlineUsers});
        
        // send to all other clients except the sender
        socket.broadcast.emit('new_online_user', onlineUser)
    })
};