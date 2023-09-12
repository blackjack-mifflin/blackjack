import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import AddButton from "../components/AddButton";
import ProfileAvatar from "../components/ProfileAvatar";

const Profile = () => {
    const [playerInfo, setPlayerInfo] = useState(null);
    const { playerId } = useParams();

    useEffect(() => {
        const fetchPlayer = async () => {
            //make sure to change 1 to ${playerId}
            const response = await fetch(`/api/players/1`)
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
        </section>
    )
}

export default Profile