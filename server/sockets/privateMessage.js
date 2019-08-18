const ChatRoom = require('../models/ChatRooms');
const User = require('../models/User');

module.exports = (io, socket) => {
    socket.on('send_private_message', async (message) => {
        const emitterUser = await User.findOne({ socketId: socket.id });
        const receiverUser = await User.findById(message.receiverId);

        const messageToReceiver = {
            emitterSocketId: socket.id,
            emitterId: emitterUser._id,
            nickname: emitterUser.nickname,
            receiverId: receiverUser._id,
            message: message.message
        }

        const alreadyinRoom = await find({
            $all : [emitterUser._id, receiverUser._id]
        })

        if (alreadyinRoom.length) {
            io.in(alreadyinRoom[0]).clients((error, clients) => {
                // if user is not inside the room yet
				if (clients.every(x => String(x) !== String(receiverUser.socketId))) {
					// sending to individual socketid (private message)
					io.to(receiverUser.socketId).emit('receive private message', messageToReceiver);
				}

				// sending to all clients inside the room, including sender
				io.in(alreadyInRoom[0]._id).emit('receive private message', messageToReceiver);
            });
        }

        io.socket(receiverUser.socketId).emit(messageToReceiver);
    });
}