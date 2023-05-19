import { Home } from "../backend/pages/home";
import { ProductListing } from "../backend/pages/productListing";
import { Wishlist } from "../backend/pages/wishlist";
import { Cart } from "../backend/pages/cart";
import { Profile } from "../backend/pages/profile";
import { NavLink, Route, Routes } from "react-router-dom";

export const Navigation = () => {
    return (
        <>
            <nav>
                <NavLink to="/">Home</NavLink> |
                | <NavLink to="/products">Products</NavLink> |
                | <NavLink to="/wishlist">Wishlist</NavLink> |
                | <NavLink to="/cart">Cart</NavLink> |
                | <NavLink to="/profile">Profile</NavLink> |
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </>
    )
}