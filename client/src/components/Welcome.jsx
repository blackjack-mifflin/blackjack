// import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';

// const Welcome = () => {
//     const [messages, setMessages] = useState([]);
//     const [inputMessage, setInputMessage] = useState('');
//     const socket = io('/');

//     socket.on('new message', (data) => {
//         setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         socket.emit('message', { name: 'YourName', message: inputMessage });
//         setInputMessage('');
//     };

//     return (
//         <div className="welcome-container">
//             <h1>Welcome to Blackjack Mifflin</h1>
//             <form onSubmit={handleSubmit} className="message-form">
//                 <input
//                     type="text"
//                     value={inputMessage}
//                     onChange={(e) => setInputMessage(e.target.value)}
//                     className="message-input"
//                 />
//                 <button type="submit" className="message-button">Send</button>
//             </form>
//         </div>
//     );
// };

// export default Welcome;

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Welcome = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [inputName, setInputName] = useState(''); // Add a new state for the user's name
    const socket = io('/');

    socket.on('new message', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send the message and user's name to the server
        socket.emit('message', { name: inputName, message: inputMessage });

        setInputMessage('');
    };

    return (
        <div className="welcome-container">
            <h1>Welcome to Blackjack Mifflin</h1>
            <form onSubmit={handleSubmit} className="message-form">
                {/* Input field for the user's name */}
                <input
                    type="text"
                    placeholder="Your Name"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="name-input"
                />
                {/* Input field for the message */}
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
    );
};

export default Welcome;
