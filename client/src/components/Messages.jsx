import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const socket = io('/');

    useEffect(() => {
        socket.on('new message', (msg) => {

            setMessages((prevMessages) => [...prevMessages, msg]);
        });
        return () => {
            socket.off('new message');
        };
    }, [socket]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send the message to the server
        socket.emit('message', inputMessage);
        setInputMessage('');
    };

    return (
        <body>
            {/* <h1>Web Socket Chat App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button type="submit">Se
                nd</button>
            </form> */}
            <ul>
                {messages.map((msg, index) => (
                    <ul key={index}>{msg}</ul>
                ))}
            </ul>
        </body>
    );
};

export default Messages;
