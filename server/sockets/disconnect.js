const User = require('../models/User');

module.exports = (io, socket) => {
    socket.on('disconnect', async () => {
        const userToRemove = await User.findOne( {socketId: socket.id})
        if (userToRemove !== null){
            await User.findOneAndRemove( {socketId: userToRemove.id}, (error) => {
                if (error === null){
                    io.emit('disconnected_user', {userId: userToRemove.id})
                    console.log('user disconnected with userID: ' + userToRemove.id)
                }else{
                    console.log('disconnect: error disconnecting')
                }
            });
        }else {
            console.log('disconnect: userToRemove not found.')
        }
        
    });
}