import {useState, useEffect} from "react"
import { useParams } from "react-router-dom";

const ProfileAvatar = ({playerInfo}) => {
    const [avatar, setAvatar] = useState(null)
    const avatarId = playerInfo.avatarId
    useEffect(() => {
        const fetchAvatar = async() => {
             //make sure to change 1 to ${avatarId}
            const response = await fetch(`/api/avatars/${avatarId}`)
            if (response.ok) {
                const data = await response.json();
                setAvatar(data)
            } else {
                console.error("Error fetching Avatar")
            }
        }
        fetchAvatar();
    }, [avatarId])

    return (
        <section>
            {avatar && <img src={avatar.image_url} alt="Avatar" />}
        </section>
    )
}

export default ProfileAvatar