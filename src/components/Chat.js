// import React, { useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';
// import axios from 'axios';
// import './ChatStyles.css';
// import { useParams } from 'react-router-dom';

// const socket = io('http://localhost:5000');

// const Chat = () => {
//   const params = useParams();
//   const senderId = params.doctorId;
//   const receiverId = params.patientId;
//   const roomId = `${senderId}-${receiverId}`;

//   const [receiver, setReceiver] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const messageInputRef = useRef(null);
//   const role = localStorage.getItem('role');

//   // Fetch receiver name based on role
//   // useEffect(() => {
//   //   const fetchReceiverName = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         `http://localhost:5000/${role === 'doctor' ? 'patient' : 'doctor'}/${receiverId}`
//   //       );
//   //       setReceiver(response.data.name);
//   //     } catch (error) {
//   //       console.error('Error fetching receiver name', error);
//   //     }
//   //   };

//   //   fetchReceiverName();
//   // }, [receiverId, role]);

//   // Fetch chat history and manage socket events
//   useEffect(() => {

//     const fetchChatHistory = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/chat/${roomId}`);
//         console.log(response.data.data);
//         setMessages(response.data.data || []);
//         // console.log(response.data.message);
//         // setMessages(response);
//             console.log(messages);

//       } catch (error) {
//         console.error('Error fetching chat history', error);
//       }
//     };

//     fetchChatHistory();

//     socket.emit('joinRoom', roomId);

//     socket.on('receiveMessage', (data) => {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { senderId: data.senderId, message: data.message, timestamp: data.timestamp },
//       ]);
//     });

//     return () => {
//       socket.off('receiveMessage');
//       socket.emit('leaveRoom', roomId);
//     };
//   }, [roomId]);

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     const newMessage = {
//       roomId,
//       senderId,
//       receiverId,
//       message: message.trim(),
//       timestamp: new Date().toISOString(),
//     };
// try{
//   socket.emit('sendMessage', newMessage);

//   // Update local state
//   // setMessages((prevMessages) => [...prevMessages, newMessage]);

//   setMessage('');
//   messageInputRef.current.focus();

// }catch (error) {
//   console.error('Error sending message', error);
// }
//     // Emit the new message

//   };

//   // Format the timestamp for display
//   const formatTimestamp = (timestamp) => {
//     const date = new Date(timestamp);
//     return isNaN(date.getTime())
//       ? 'Invalid Time'
//       : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <h2>Chat with {receiver || 'User'}</h2>
//       </div>
//       {/* <div className="chat-history">
//         { messages.map((msg, index) => (
//           <div
//             key={index}
//             // className={`message ${msg.senderId === senderId ? 'sent' : 'received'}`}
//           >
//             <p>{msg.message}</p>
//             <small className="timestamp">{formatTimestamp(msg.timestamp)}</small>
//           </div>
//         ))}
//       </div> */}
//       <div className="chat-history">
//   {messages.length > 0 ? (
//     messages.map((msg, index) => (
//       <div
//         key={index}
//         className={`message ${msg.senderId === senderId ? 'sent' : 'received'}`}
//       >
//         <p>{msg.message}</p>
//         <small className="timestamp">{formatTimestamp(msg.timestamp)}</small>
//       </div>
//     ))
//   ) : (
//     <p>No messages yet.</p> // Display a fallback if there are no messages
//   )}
// </div>

//       <div className="chat-footer">
//         <input
//           ref={messageInputRef}
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message"
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;



import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ChatStyles.css';

const socket = io('http://localhost:5000');

const Chat = () => {
  const params = useParams();
  const senderId = params.doctorId;
  const receiverId = params.patientId;
  const roomId = `${senderId}-${receiverId}`;

  const [receiver, setReceiver] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messageInputRef = useRef(null);
  const role = localStorage.getItem('role');
  const navigate = useNavigate(); // For navigation

  // Fetch receiver name based on role
  useEffect(() => {
    const fetchReceiverName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/${role === 'doctor' ? 'patient' : 'doctor'}/${receiverId}`
        );
        setReceiver(response.data.name);
      } catch (error) {
        console.error('Error fetching receiver name', error);
      }
    };

    fetchReceiverName();
  }, [receiverId, role]);

  // Fetch chat history and manage socket events
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chat/${roomId}`);
        setMessages(response.data.data || []);
      } catch (error) {
        console.error('Error fetching chat history', error);
      }
    };

    fetchChatHistory();

    socket.emit('joinRoom', roomId);

    socket.on('receiveMessage', (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { senderId: data.senderId, message: data.message, timestamp: data.timestamp },
      ]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.emit('leaveRoom', roomId);
    };
  }, [roomId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      roomId,
      senderId,
      receiverId,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      socket.emit('sendMessage', newMessage);
      setMessage('');
      messageInputRef.current.focus();
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  // Format the timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime())
      ? 'Invalid Time'
      : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Function to handle closing the chat and navigating to the dashboard
  const handleCloseChat = () => {
    if (role === 'doctor') {
      navigate('/dashboarddoctor'); // Redirect to doctor dashboard
    } else if (role === 'patient') {
      navigate('/dashboard'); // Redirect to patient dashboard
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with {receiver || 'User'}</h2>
        <button className="close-btn" onClick={handleCloseChat}>X</button> {/* Close button */}
      </div>

      <div className="chat-history">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.senderId === senderId ? 'sent' : 'received'}`}
            >
              <p>{msg.message}</p>
              <small className="timestamp">{formatTimestamp(msg.timestamp)}</small>
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>

      <div className="chat-footer">
        <input
          ref={messageInputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
