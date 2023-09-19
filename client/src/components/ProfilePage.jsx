import { useState, useEffect } from "react"
import AddButton from "./AddButton";
import ProfileAvatar from "./ProfileAvatar";
import ProfileEditForm from "./ProfileEditForm";

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
        <section id="profile-container">
            <h1>Profile Page</h1>
            {playerInfo ? (
                    <section>
                        <h1>Welcome {playerInfo.username}</h1>
                        <p>Balance: ${playerInfo.balance}</p>
                        <p>Avatar ID: {playerInfo.avatarId}</p>
                        <ProfileAvatar playerInfo={playerInfo}/>
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