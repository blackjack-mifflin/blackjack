import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const socket = io('/');

    useEffect(() => {
        socket.on('new message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });
        return () => {
            socket.off('new message');
        };
    }, [socket]);


    const messageWindowStyle = {
        backgroundColor: '#f5f5f5',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '20px',
        maxWidth: '400px',
        margin: '0 auto',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const headingStyle = {
        fontSize: '24px',
        marginBottom: '10px',
        color: '#333',
    };

    const listStyle = {
        listStyle: 'none',
        padding: '0',
    };

    const messageStyle = {
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        margin: '5px 0',
    };

    return (
        <div className="message-window" style={messageWindowStyle}>
            <h1 style={headingStyle}>Messages</h1>
            <div className="message-list">
                <ul style={listStyle}>
                    {messages.map((msg, index) => (
                        <li key={index} style={messageStyle}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('message', inputMessage);
        setInputMessage('');
    };

    return (
        <body>
            <ul>
                {messages.map((msg, index) => (
                    <ul key={index}>{msg}</ul>
                ))}
            </ul>
        </body>

    );
};

export default Messages;

