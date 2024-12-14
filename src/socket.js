import { io } from "socket.io-client";

const socket = io('http://localhost:5000'); // Replace with your server URL

// Join a room
socket.emit('joinRoom', 'room1');

// Send a message
socket.emit('sendMessage', {
  roomId: 'room1',
  senderId: 'user123',
  receiverId: 'user456',
  message: 'Hello!',
});

// Receive a message
socket.on('receiveMessage', (data) => {
  console.log('New message:', data);
});
