import { NavLink } from "react-router-dom";

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
                    <NavLink to="/"><img className="homeIcon" src="/images/icons/home.png" /></NavLink>
                    <NavLink to="/products"><img className="productsIcon" src="/images/icons/products.png" /></NavLink>
                    <NavLink to="/wishlist"><img className="wishlistIcon" src="/images/icons/wishlist.png" /></NavLink> 
                    <NavLink to="/cart"><img className="cartIcon" src="/images/icons/cart.png" /></NavLink>
                    <NavLink to="/profile"><img className="profileIcon" src="/images/icons/profile.png" /></NavLink>
                </div>
            </nav>
        </>
    )
}