import { useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../styles/singleProduct.css";

import { useAuth } from "../contexts/authContext";
import { CartContext } from "../contexts/cartContext";
import { ProductContext } from "../contexts/productContext";
import { WishlistContext } from "../contexts/wishlistContext";

export const ProductDetails = () => {
  const { token } = useAuth();
  const {products} = useContext(ProductContext)
  const { postCartHandler, cartItems } = useContext(CartContext);
  const { postWishlistHandler, deleteWishlistHandler, wishlistItems } = useContext(WishlistContext);

  const navigate = useNavigate();
  const location = useLocation();
  const { _id } = useParams();

  const item = products.find((el) => el._id === _id)
  const { title, imageLink, description, rating, price, discountedPrice, inStock, size, deliveryTime, reviews } = item;

  const isCarted = () => cartItems?.some((item) => item._id === _id) ?? false;  

  const isWished = () => wishlistItems?.some((item) => item._id === _id) ?? false;

  const handleAddToCart = () => {
    if(!token){
      navigate('/login', { state: { from: location } });
    }
    else {
      if (!isCarted()) {
        postCartHandler(item, token)
        item.carted = true;
        item.qty++
        toast.success('Item Added to Cart!');
      } else {
        navigate("/cart") ;
      }
    }
  }
  
  const handleAddToWishlist = () =>{
    if(!token){
      navigate('/login', { state: { from: location } });
    }
    else {
      if (!isWished()) {
        postWishlistHandler(item, token)
        item.wished = true;
        toast.success('Item Added to Wishlist!');
      } else {
        deleteWishlistHandler(item._id, token)
        item.wished = false;
        toast.warning('Item Removed from Wishlist!');
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
            {isCarted() ? "Go to cart" : "Add to cart"}
          </button>
          <button onClick={() => handleAddToWishlist()} className="item-button">
          {isWished() ? "Remove from Wishlist" : "Add to Wishlist"}
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
