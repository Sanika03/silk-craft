import { useNavigate } from "react-router-dom";

import "../styles/orderSuccessful.css"

export const OrderSuccessful = () => {
    const navigate = useNavigate();
    return (
        <div className="successful-container">
            <img src="/images/optional/orderSuccessful.png" className="orderSuccessful-image" alt="Order Successful"/>
            <button onClick={() => navigate("/")} className="home-button">Go to Home</button>
        </div>
    )
}