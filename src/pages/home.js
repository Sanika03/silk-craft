import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { FilterContext } from "../contexts/filterContext";
import { ProductContext } from "../contexts/productContext";

import "../styles/home.css"


export const Home = () => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);
    const {filter, setFilter} = useContext(FilterContext);
    const {categories, isCategoryLoading} = useContext(ProductContext);

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
        setFilter({ ...filter, category: categoryName });
        window.scrollTo(0, 0);
    }

    const getCategoryProducts = () => (
            <div className="products-container">
                {categories.map(({categoryName, image}) =>
                    <div className="category-container" onClick={() => goToSelectedProducts(categoryName)}>
                        <p className="category-text">{categoryName} Collection</p>
                        <img src={image} className="category-image" alt={categoryName} />
                    </div>
                )}
            </div>
    )

    const getLoader = () => isCategoryLoading && <img src="/images/loader/loader.gif" className="loader"/>  

    return (
        <>
            {!isCategoryLoading ? (
                <div className="mainDiv">
                    {getVideo()}
                    {getQuote()}
                    {getCategoryProducts()}
                </div>
            ) : getLoader()}
        </>
    )
}