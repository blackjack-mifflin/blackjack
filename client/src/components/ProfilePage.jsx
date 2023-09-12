import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import AddButton from "./AddButton";
import ProfileAvatar from "./ProfileAvatar";
import ProfileEditForm from "./ProfileEditForm";

const Profile = ({token}) => {
    const [playerInfo, setPlayerInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false)
    const { playerId } = useParams();

    useEffect(() => {
        const fetchPlayer = async () => {
            //make sure to change 1 to ${playerId}
            const response = await fetch(`/api/players/2`)
            if (response.ok) {
                console.log("THIS IS RESPONSE", response)
                const data = await response.json();
                setPlayerInfo(data)
                console.log("THIS IS DATA FROM PROFILE.JSX", data)
            } else {
                console.error("Error fetching Player")
            }
            
        }
        fetchPlayer();
    }, [playerId]);
    
    const handleAddMoney = (amt) => {
        alert(`Adding $${amt} to the balance`)
        setPlayerInfo((oldBalance) => ({
            ...oldBalance,
            balance: oldBalance.balance + amt
        }))
    }

    const editProfile = async (newUser, newPw) => {
        try {
            const response = await fetch(`/api/players/${playerId}`, {
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
        <section id="profile-container">
            <h1>Profile Page</h1>
            {playerInfo ? (
                    <section>
                        <h1>Welcome {playerInfo.username}</h1>
                        <p>Balance: ${playerInfo.balance}</p>
                        <p>Avatar ID: {playerInfo.avatarId}</p>
                        <ProfileAvatar />
                        <AddButton handleAddMoney={handleAddMoney}/>
                    </section>    
                ) : (
                    <p>Loading...Info...</p>
                )
            }
            {isEditing ? (
                <ProfileEditForm onSubmit={editProfile} />
            ) : (
                <button onClick={editButton}>Edit Username & PW</button>
            )}
        </section>
    )
}

export default Profile