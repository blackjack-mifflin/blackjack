import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";

const Profile = () => {
    // const [playerInfo, setPlayerInfo] = useState([]);
    // const [searchParams] = useSearchParams();

    // useEffect(() => {
    //     const fetchPlayer = async () => {
    //         const response = await fetch(`/api/players/${searchParams.get('playerId')}`)
    //         console.log("THIS IS RESPONSE", response)
    //         const data = await response.json();
    //         console.log("THIS IS DATA FROM PROFILE.JSX", data)
    //         setPlayerInfo(data)
            
    //     }
    //     fetchPlayer();
    // }, []);
    

    return (
        <section id="profile-container">
            <h1>Profile Page</h1>
            {/* <h1>Welcome {playerInfo.username}</h1>
            <p>Balance: {playerInfo.balance}</p>
            <p>{playerInfo.avatarId}</p> */}
        </section>
    )
}

export default Profile