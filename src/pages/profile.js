import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faEnvelope, faPen, faCheck } from "@fortawesome/free-solid-svg-icons";

import "../styles/profile.css";
import { useAuth } from "../contexts/authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AddressManagement } from "../components/addressManagement";

export const Profile = () => {
    const { currUser, logoutHandler, setCurrUser } = useAuth();

    const [isEditing, setIsEditing] = useState({ userName: false, email: false});
    const [updatedUsername, setUpdatedUsername] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState(currUser.email);

    const navigate = useNavigate();

    const handleLogout = () => {
        logoutHandler();
        navigate("/logout");
        toast.warning('Successfully Logged Out!');
    }

    const handleEditUserName = () => {
        setIsEditing({...isEditing, userName: true});
        setUpdatedUsername(currUser.name);
    };

    const handleSaveUsername = () => {
        setCurrUser({...currUser, name: updatedUsername});
        setIsEditing({...isEditing, userName: false});
    }

    const handleEditEmail = () => {
        setIsEditing({...isEditing, email: true});
        setUpdatedEmail(currUser.email);
    };

    const handleSaveEmail = () => {
        setIsEditing({...isEditing, email: false});
        setCurrUser({...currUser, email: updatedEmail});
        console.log(currUser.email) 
      };
    
    const getProfileCard = () => <div className="profile-card">
        <div className="user-head">
            <div className="user-head-details">
                <span className="profile-icon"><FontAwesomeIcon icon={faCircleUser}/></span>
                {isEditing.userName ? (
                    <input
                    className="edit-username-input"
                    type="text"
                    value={updatedUsername}
                    onChange={(e) => setUpdatedUsername(e.target.value)}
                    />
                ) : (
                    <p className="user-name">
                    {currUser.name}
                    </p>
                )}
            </div>
            {isEditing.userName ? (
                <button onClick={() => handleSaveUsername()} className="check-icon">
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                ) : (
                <button onClick={() => handleEditUserName()} className="pen-icon">
                    <FontAwesomeIcon icon={faPen} />
                </button>
                )}
        </div>
        <hr/>
        <div className="email-head">
            <div className="email-head-details">
                <span className="mail-icon"><FontAwesomeIcon icon={faEnvelope}/></span>
                {isEditing.email ? (
                    <input
                    className="edit-email-input"
                    type="text"
                    value={updatedEmail}
                    onChange={(e) => setUpdatedEmail(e.target.value)}
                    />
                ) : (
                    <p>Email - {currUser.email}</p>
                )}
            </div>
            {isEditing.email ? (
                <button onClick={() => handleSaveEmail()} className="check-icon">
                    <FontAwesomeIcon icon={faCheck} />
                </button>
                ) : (
                <button onClick={() => handleEditEmail()} className="pen-icon">
                    <FontAwesomeIcon icon={faPen} />
                </button>
                )}
        </div>
        <hr/>
        <AddressManagement />
        <hr/>
        <button onClick={() => handleLogout()} className="logout-btn">Logout</button>
    </div>

    return (
        <div className="profile-page">
            {getProfileCard()}
        </div>
    )
}