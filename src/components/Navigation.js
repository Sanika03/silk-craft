import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faThLarge, faHeart, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

import "../styles/navigation.css"
import { useContext } from "react";
import { FilterContext } from "../contexts/filterContext";

export const Navigation = () => {
    const {filter, setFilter} = useContext(FilterContext);

    const navigate = useNavigate()

    const handleSearch = (e) => {
        navigate("/products")
        setFilter({...filter, search: e.target.value})
    }
    return (
        <>
            <nav className="navHeader">
                <NavLink to="/" className="titleName">
                    <h1>SilkCraft</h1>
                </NavLink>
                <div className="inputDiv">
                    <input type="search" placeholder="🔍 Search" className="input" onChange={(e) => handleSearch(e)}></input>
                </div>
                <div className="navDiv">
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
