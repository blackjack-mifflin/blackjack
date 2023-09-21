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

const Profile = () => {
    const [playerInfo, setPlayerInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false)
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('userId')

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
                    setPlayerInfo(data)
                } else {
                    console.error("Error fetching Player!")
                }
            } catch (error) {
                console.error("Error....", error)
            }
        }
        fetchPlayer();
    }, []);
    
    const handleAddMoney = (amt) => {
        alert(`Adding $${amt} to the balance`)
        setPlayerInfo((oldBalance) => ({
            ...oldBalance,
            balance: oldBalance.balance + amt
        }))
    }

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
                setIsEditing(false)
            } else {
                console.error("Error updating profile")
            }
        } catch (error) {
            console.error("Error updating profile", error)
        }
    }

    const editButton = () => {
        setIsEditing(!isEditing)
    }
    return (
        <>
        <section id="profile-container">
            {playerInfo ? <ProfileAvatar playerInfo={playerInfo}/> : ''}
            
            {playerInfo ? (
            <section>
                <h1>Welcome {playerInfo.username}</h1>
                <p>Balance: ${playerInfo.balance}</p>
                <AddButton handleAddMoney={handleAddMoney}/>
            </section>) : (<p>Loading...Info...</p>)}

            {isEditing ? (<ProfileEditForm onSubmit={editProfile} />) 
            : (<button onClick={editButton}>Edit Username & PW</button>)}
        </section>

        <section id="winLoss">
            <Card sx={{ maxWidth: 345 }}>
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
                <Button href="https://pages.cs.wisc.edu/~harron/" size="small">Learn More</Button>
            </CardActions>
            </Card>
        </section>

        <section id="winLoss">
            <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQJ8GetVR49cT7CIjEcO0C_IOw4eR6ozYQ7A&usqp=CAU'
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="span">
                {playerInfo ? `Total Games Played: ${playerInfo.losses + playerInfo.wins}` : 'Sign in for more info'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button href="https://twitter.com/intent/tweet" size="small">Share</Button>
                <Button href="https://pages.cs.wisc.edu/~harron/" size="small">Learn More</Button>
            </CardActions>
            </Card>
        </section>


        </>
    )
}

export default Profile