import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faThLarge, faHeart, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

import "../styles/navigation.css"

export const Navigation = () => {
    return (
        <>
            <nav className="navHeader">
                <div className="titleName">
                    <h1>SilkCraft</h1>
                </div>
                <div className="inputDiv">
                    <input type="search" placeholder="🔍 Search" className="input"></input>
                </div>
                <div className="navDiv">
                    <NavLink to="/">
                        <FontAwesomeIcon icon={faHome} className="navIcon" />
                    </NavLink>
                    <NavLink to="/products">
                        <FontAwesomeIcon icon={faThLarge} className="navIcon" />
                    </NavLink>
                    <NavLink to="/wishlist">
                        <FontAwesomeIcon icon={faHeart} className="navIcon" />
                    </NavLink> 
                    <NavLink to="/cart">
                        <FontAwesomeIcon icon={faShoppingCart} className="navIcon" />
                    </NavLink>
                    <NavLink to="/profile">
                        <FontAwesomeIcon icon={faUser} className="navIcon" />
                    </NavLink>
                </div>
            </nav>
        </>
    )
}
