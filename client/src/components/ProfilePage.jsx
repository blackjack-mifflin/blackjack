import { useState, useEffect } from "react"
import AddButton from "./AddButton";
import ProfileAvatar from "./ProfileAvatar";
import ProfileEditForm from "./ProfileEditForm";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../App.css';

const Profile = () => {
    const [playerInfo, setPlayerInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('userId');

    useEffect(() => {
        const fetchPlayer = async () => {
            if (!token) {
                console.error('Token not found in localStorage');
                return;
            }
            try {
                const response = await fetch(`/api/players/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setPlayerInfo(data);
                } else {
                    console.error("Error fetching Player!");
                }
            } catch (error) {
                console.error("Error....", error);
            }
        }
        fetchPlayer();
    }, []);

    const editProfile = async (newUser, newPw) => {
        try {
            const response = await fetch(`/api/players/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: newUser,
                    password: newPw
                })
            });
            if(response.ok) {
                setIsEditing(false);
            } else {
                console.error("Error updating profile");
            }
        } catch (error) {
            console.error("Error updating profile", error);
        }
    }

    const editButton = () => {
        setIsEditing(!isEditing);
    }
    return (
        <>
        <div id="profile-photo">{playerInfo ? <ProfileAvatar playerInfo={playerInfo}/> : ''}
        </div>
            <h2>Current Balance: {playerInfo ? playerInfo.balance : ''}</h2>
            <AddButton playerInfo={playerInfo}/>
            {isEditing ? (<ProfileEditForm onSubmit={editProfile} />) 
            : (<div><button onClick={editButton}>Edit Username & PW</button></div>)}

            <Card sx={{ maxWidth: 750 }} id="stats">
            <CardMedia
                sx={{ height: 200 }}
                image='https://client.dragongaming.com/wp-content/uploads/2021/01/blackjack-logo.jpg.png'
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
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
            <br/>
            <br/>
            <Card sx={{ maxWidth: 750 }} id="stats">
            <CardMedia
                sx={{ height: 25 }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {playerInfo ? `Total Games Played: ${playerInfo.losses + playerInfo.wins}` : 'Sign in for more info'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href="https://twitter.com/intent/tweet" size="small">Share</Button>
            </CardActions>
            </Card>
        </>
    )
}

export default Profile