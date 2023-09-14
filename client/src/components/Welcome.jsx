import '../App.css'; // Import your CSS file here
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Welcome = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const socket = io('/'); // Connect to the WebSocket server

    socket.on('new message', (msg) => {
        // Update the messages when a new message is received
        setMessages((prevMessages) => [...prevMessages, msg]);
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the message to the server
        socket.emit('message', inputMessage);
        setInputMessage('');
    };

    return (
        <div className="welcome-container">
            <h1>Welcome to Blackjack Mifflin</h1>
            <p>Get ready for the fun!</p>
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="message-input"
                />
                <button type="submit" className="message-button">Send</button>
            </form>
        </div>
    );
};

export default Welcome;

