const { User, ChatRooms } = require('../models/models')

module.exports = (io, socket) => {
    io.on('disconnect', async () => {
        const userToRemove = await userToRemove.findOne({ socketId: socket.id });
        await userToRemove.findOneAndRemove({ socketId: socket.id });
        io.emit('disconnected user', {userId: userToRemove._id})
    });
}