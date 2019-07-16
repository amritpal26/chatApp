const mongoose = require('mongoose');

const Users = new mongoose.Schema({
  socketId: {type: String,required: true},
  nickname: String,
  dob: Date
});

const ChatMessage = new mongoose.Schema({
  message: {type: String, required: true},
  date: Date
})

// const Chats = new mongoose.Schema({
//   author1: {type: mongoose.Schema.ObjectId, ref: 'User'},
//   author2: {type: mongoose.Schema.ObjectId, ref: 'User'},
//   isChatRoomMessage: Boolean, 
//   messages: [ChatMessage],
// });

const ChatRooms = new mongoose.Schema({
  name: String,
  users: [{ 
    type: mongoose.Schema.ObjectId,
    ref: 'User' 
  }],
  isPrivateChatRoom: Boolean,
  messages: [ChatMessage],
  chatId: { type: mongoose.Schema.ObjectId, ref: 'Chat'}
});

const User = mongoose.model('User', Users);
const ChatRoom = mongoose.model('ChatRoom', ChatRooms);

module.exports = {User, ChatRoom};