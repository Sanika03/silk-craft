import { useNavigate } from "react-router-dom"
import "../styles/errorPage.css"

export const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="error-page">
            <img src="/images/optional/PageNotFound.jpg" alt="Page Not Found" className="page-not-found-image"/>
            <h2 className="not-found-heading">We looked everywhere</h2>
            <p>Looks like the page you are looking for is missing.</p>
            <button onClick={() => navigate("/")} className="home-button">Go to Home</button>
        </div>
    )
}