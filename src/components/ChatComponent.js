import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Initialize the Socket.IO client
const socket = io('http://localhost:5000'); // Replace with your server URL

const ChatComponent = () => {
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(`user_${Math.random().toString(36).substr(2, 5)}`); // Random user ID

  // Join a room when roomId is set
  const joinRoom = () => {
    if (roomId.trim()) {
      socket.emit('joinRoom', roomId);
      console.log(`Joined room: ${roomId}`);
    }
  };

  // Send a message to the room
  const sendMessage = () => {
    if (message.trim() && roomId.trim()) {
      const newMessage = {
        roomId,
        senderId: userId,
        receiverId: 'room', // Assuming group chat; can be specific for private chat
        message,
      };

      // Emit the message to the server
      socket.emit('sendMessage', newMessage);

      // Append the message locally for immediate feedback
      setMessages((prevMessages) => [...prevMessages, { ...newMessage, timestamp: new Date().toISOString() }]);
      setMessage('');
    }
  };

  // Listen for new messages
  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup listener on component unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  return (
    <div style={styles.chatContainer}>
      <h2>Real-Time Chat</h2>

      {/* Room Selection */}
      <div style={styles.roomContainer}>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          style={styles.input}
        />
        <button onClick={joinRoom} style={styles.button}>Join Room</button>
      </div>

      {/* Chat Messages */}
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.senderId === userId ? styles.myMessage : styles.theirMessage}>
            <p><strong>{msg.senderId}</strong>: {msg.message}</p>
            <span style={styles.timestamp}>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div style={styles.messageInputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

// Basic inline styles
const styles = {
  chatContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  roomContainer: {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
  },
  messagesContainer: {
    height: '300px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
  },
  myMessage: {
    textAlign: 'right',
    backgroundColor: '#d4edda',
    padding: '10px',
    borderRadius: '8px',
    margin: '5px 0',
  },
  theirMessage: {
    textAlign: 'left',
    backgroundColor: '#f8d7da',
    padding: '10px',
    borderRadius: '8px',
    margin: '5px 0',
  },
  timestamp: {
    display: 'block',
    fontSize: '0.8rem',
    color: '#888',
    marginTop: '5px',
  },
  messageInputContainer: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ChatComponent;
