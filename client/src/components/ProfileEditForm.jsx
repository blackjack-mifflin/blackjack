import { useState } from "react";

const ProfileEditForm = ({onSubmit}) => {
    const [newUser, setNewUser] = useState("");
    const [newPw, setNewPw] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(newUser, newPw);
        setNewUser("");
        setNewPw("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>New Username:</label>
                <input 
                    type="text"
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                />
            </div>
            <div>
                <label>New Password:</label>
                <input 
                    type="text"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                />
            </div>
            <button type="submit">Save Changes</button>
        </form>
    )
}

export default ProfileEditForm