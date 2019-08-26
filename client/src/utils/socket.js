import io from 'socket.io-client';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'https://chat-application-26.herokuapp.com/'
const socket = io(BASE_URL);

socket.on('connect', (e) => {
    socket.on('disconnect', () => {
        console.log("client disconnected");
    });

    socket.on('receive_private_message', (message) => {
        console.log('receive_private_message: ' + message)
    });
});

export default socket;