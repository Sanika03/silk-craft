import { useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import "../styles/singleProduct.css";

import { useAuth } from "../contexts/authContext";
import { CartContext } from "../contexts/cartContext";
import { ProductContext } from "../contexts/productContext";
import { WishlistContext } from "../contexts/wishlistContext";

export const ProductDetails = () => {
  const { token } = useAuth();
  const {products} = useContext(ProductContext)
  const { postCartHandler } = useContext(CartContext);
  const { postWishlistHandler, deleteWishlistHandler } = useContext(WishlistContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { _id } = useParams();

  const item = products.find((el) => el._id === _id)
  const { title, imageLink, description, rating, price, discountedPrice, carted, wished, inStock, size, deliveryTime, reviews } = item;

  const handleAddToCart = () => {
    if(!token){
      navigate('/login', { state: { from: location } });
    }
    else {
      if (carted === false) {
        postCartHandler(item, token)
        item.carted = true;
        item.qty++
      } else if (carted === true) {
        navigate("/cart") ;
      }
    }
  }
  
  const handleAddToWishlist = () =>{
    if(!token){
      navigate('/login', { state: { from: location } });
    }
    else {
      if (wished === false) {
        postWishlistHandler(item, token)
        item.wished = true;
      } else if (wished === true) {
        deleteWishlistHandler(item._id, token)
        item.wished = false;
      }
    }
  }

  const getProductDetails = () => (
    <div className="singleProduct-container">
      <img src={imageLink} className="image" alt={_id}/>
      <div className="details-container">
        <p className="text-title">{title}</p>
        <div className="small-text">
          <p className="text-r">{rating} ⭐ / {reviews} reviews</p>
        </div>
        <div className="sub-text-container">
          <p className="text-xl">Rs. {discountedPrice}</p>
          <p className="text-s">Rs. {price}</p>
        </div>
        <div className="horizontal-line"></div>
        <p className="text-m"><span className="text-bold">Description: </span>{description}</p>
        <p className="text-m"><span className="text-bold">Availability: </span>{inStock ? "In Stock" : "Out of Stock"}</p>
        <p className="text-m"><span className="text-bold">Size: </span>{size}</p>
        <p className="text-m"><span className="text-bold">Delivery Time: </span>{deliveryTime} days</p>
        <div className="button-container">
        <button onClick={() => handleAddToCart()} className="item-button">
          {carted ? "Go to cart" : "Add to cart"}
        </button>
          <button onClick={() => handleAddToWishlist()} className="item-button">
          {wished ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {item && getProductDetails()}
    </>
  );
};
