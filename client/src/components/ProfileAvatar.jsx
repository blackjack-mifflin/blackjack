import {useState, useEffect} from "react"
import '../App.css'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const ProfileAvatar = ({playerInfo}) => {
    const [avatar, setAvatar] = useState(null)
    const avatarId = playerInfo.avatarId
    useEffect(() => {
        const fetchAvatar = async() => {
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
            <Stack direction="row" spacing={2}>
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