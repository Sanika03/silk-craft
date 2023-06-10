import { useNavigate } from "react-router-dom"

import "../styles/logout.css"

export const Logout = () => {
    const navigate = useNavigate();

    return (
        <div className="logout-container">
            <img src="/images/optional/sadFace.png" alt="Sad Face" className="logout-image"/>
            <h1 className="logout-heading">Oh no! You are logged out</h1>
            <p>Don't miss out on incredible deals!</p>
            <button onClick={() => navigate("/products")} className="explore-button">See Products</button>
        </div>
    )
}