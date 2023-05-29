import { useState, useRef, useContext } from "react";

import { categories } from "../db/categories";
import { FilterContext } from "../../contexts/filterContext";

import "../../styles/home.css"
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);
    const {filter, setFilter} = useContext(FilterContext);

    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const getVideo = () =>  (
        <div className="video-container">
            <video
            className={`video ${isHovered ? "hovered" : null}`}
            src="/images/homeVideo.mp4"
            autoPlay 
            muted
            ref={videoRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            />
        </div>
    )

    const getQuote = () => (
        <div className="quote-container">
            <p className="quote-text">
                "Tradition is the heartbeat of a culture, passing down stories, values, and craftsmanship from one generation to another."
            </p>
        </div>
    )

    const goToSelectedProducts = (categoryName) => {
        navigate("/products");
        setFilter({ ...filter, category: categoryName })
    }

    const getCategoryProducts = () => (
            <div className="products-container">
                {categories.map(({categoryName, image}) =>
                    <div className="category-container">
                        <p className="category-text">{categoryName} Collection</p>
                        <img src={image} className="category-image" alt={categoryName} onClick={() => goToSelectedProducts(categoryName)}/>
                    </div>
                )}
            </div>
    )

    return (
        <div className="mainDiv">
            {getVideo()}
            {getQuote()}
            {getCategoryProducts()}
        </div>
    )
}