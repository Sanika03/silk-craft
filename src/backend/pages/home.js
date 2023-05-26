import { useState, useRef } from "react";
import "../../styles/home.css"

export const Home = () => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef(null);

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

    return (
        <div className="mainDiv">
            {getVideo()}
            {getQuote()}
        </div>
    )
}