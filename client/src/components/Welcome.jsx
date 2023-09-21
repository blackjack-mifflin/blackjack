import '../App.css';
import { useState } from 'react';
import { io } from 'socket.io-client';

const Welcome = () => {
    const [messages, setMessages] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputMessage, setInputMessage] = useState('');

    const socket = io('/');

    socket.on('new message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit('message', { name: inputName, message: inputMessage });
        setInputMessage('');
    };

    return (
        <>
        <div className="welcome-container">
            <h1>Welcome to Blackjack Mifflin</h1>
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="name-input"
                />

                <input
                    type="text"
                    placeholder="Your Message"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="message-input"
                />
                <button type="submit" className="message-button">Send</button>
            </form>
        </div>
        </>
    );
};

export default Welcome;
