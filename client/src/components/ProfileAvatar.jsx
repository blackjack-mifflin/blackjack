import {useState, useEffect} from "react"
import { useParams } from "react-router-dom";

const ProfileAvatar = () => {
    const [avatar, setAvatar] = useState(null)
    const { avatarId } = useParams()
    useEffect(() => {
        const fetchAvatar = async() => {
             //make sure to change 1 to ${avatarId}
            const response = await fetch(`/api/avatars/2`)
            if (response.ok) {
                const data = await response.json();
                console.log("THIS IS DATA FROM AVATAR", data)
                console.log("THIS IS IMAGEURL FROM AVATAR", data.image_url)
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