import {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import '../App.css'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

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
        <>
            {/* <section id='profilePic'>
                {avatar && <img src={avatar.image_url} alt="Avatar" />}
            </section> */}

            <Stack direction="row" spacing={2} id='profilePic'>
            <Avatar
            alt="Remy Sharp"
            src={avatar ? avatar.image_url : ''}
            sx={{ width: 250, height: 250 }}
            />
            </Stack>
        </>
    )
}

export default ProfileAvatar