import { useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom";

import "../styles/singleProduct.css";

import { ProductContext } from "../contexts/productContext";

export const ProductDetails = () => {
    const {
        cartItems,
        setCartItems,
        wishlistItems,
        setWishlistItems,
      } = useContext(ProductContext);

    const navigate = useNavigate();

    const location = useLocation();
    const item = location.state?.variable;

    const {title, imageLink, description, rating, price, discountedPrice, toggleButton, inStock, size, deliveryTime, reviews} = item;

    const handleAddToCart = () => {
        if (item.toggleButton === false) {
          setCartItems([...cartItems, item]);
          item.toggleButton = true;
        } else if (item.toggleButton === true) {
          navigate("/cart") ;
        }
      }
    
    const handleAddToWishlist = () =>
        setWishlistItems([...wishlistItems, item]);

    const getProductDetails = () => 
    <div className="singleProduct-container">
    <img src={imageLink} className="image"/>
    <div className="details-container">
        <p className="text-title">{title}</p>
        <div className="small-text">
            <p className="text-r">{rating} ⭐ / {reviews} reviews</p>
        </div>
        <div className="sub-text-container">
            <p className="text-xl">Rs. {discountedPrice}</p>
            <p className="text-s">Rs. {price}</p>
        </div>
        <div class="horizontal-line"></div>
        <p className="text-m"><span className="text-bold">Description: </span>
        {description}</p>
        <p className="text-m"><span className="text-bold">Availability: </span>
        {inStock ? "In Stock" : "Out of Stock"}</p>
        <p className="text-m"><span className="text-bold">Size: </span>
        {size}</p>
        <p className="text-m"><span className="text-bold">Delivery Time: </span>
        {deliveryTime} days</p>
        <div className="button-container">
            <button onClick={() => handleAddToCart()} className="item-button">
            {toggleButton === false ? (
            "Add to Cart"
            ) : (
            "Go to Cart"
            )}
            </button>
            <button onClick={() => handleAddToWishlist()} className="item-button">Add to Wishlist</button>
        </div>
    </div>
</div>
    
    return (
        <>
            item && {getProductDetails()}
        </>
    )
}