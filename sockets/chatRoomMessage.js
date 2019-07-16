const { User, ChatRoom } = require('../models/models')

module.exports = (io, socket) => {
    io.on('connection', async (msg) => {
        const user = await User.findOne({ socketId: socket.id });

        io.emit('group message', { nickname: user.nickname, message: msg })
    });
}
