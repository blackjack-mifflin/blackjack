import '../App.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Welcome = (playerInfo) => {
    console.log('test')
    return(
        <>
         <Card sx={{ maxWidth: 1000 }}>
            <CardMedia
                sx={{ height: 140 }}
                image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQJ8GetVR49cT7CIjEcO0C_IOw4eR6ozYQ7A&usqp=CAU'
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="span">
                {playerInfo ? `Win/Loss Ratio: %${playerInfo.wins / playerInfo.losses}` : 'Sign in for more info'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {playerInfo ? `Total Wins: ${playerInfo.wins}` : ''}<br/>
                {playerInfo ? `Total Losses: ${playerInfo.losses}` : ''}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href="https://twitter.com/intent/tweet" size="small">Share</Button>
            </CardActions>
            </Card>
        </>
    )
};
export default Welcome






//OLD CODE FOR WELCOME PAGE
// import { io } from 'socket.io-client';

// const Welcome = () => {
//     const [messages, setMessages] = useState([]);
//     const [inputName, setInputName] = useState('');
//     const [inputMessage, setInputMessage] = useState('');

//     const socket = io('/');

//     socket.on('new message', (msg) => {
//         setMessages((prevMessages) => [...prevMessages, msg]);
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         socket.emit('message', { name: inputName, message: inputMessage });
//         setInputMessage('');
//     };

//     return (
//         <>
//         <div className="welcome-container">
//             <h1>Welcome to Blackjack Mifflin</h1>
//             <form onSubmit={handleSubmit} className="message-form">
//                 <input
//                     type="text"
//                     placeholder="Your Name"
//                     value={inputName}
//                     onChange={(e) => setInputName(e.target.value)}
//                     className="name-input"
//                 />

//                 <input
//                     type="text"
//                     placeholder="Your Message"
//                     value={inputMessage}
//                     onChange={(e) => setInputMessage(e.target.value)}
//                     className="message-input"
//                 />
//                 <button type="submit" className="message-button">Send</button>
//             </form>
//         </div>
//         </>
//     );
// };

// export default Welcome;
