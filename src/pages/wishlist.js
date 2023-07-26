import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../styles/wishlist.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { CartContext } from "../contexts/cartContext";
import { WishlistContext } from "../contexts/wishlistContext";
import { useAuth } from "../contexts/authContext";

export const Wishlist = () => {
    const { postCartHandler, incDecCartHandler } = useContext(CartContext);
    const { deleteWishlistHandler, isWishlistLoading, wishlistItems } = useContext(WishlistContext);
  
    const {token} = useAuth();
  
    const navigate = useNavigate();

    const handleSingleProductClick = (item) => {
        navigate(`/products/${item._id}`);
      }

      const handleAddToCart = (product, event) => {
        if (product.carted === false) {
            postCartHandler(product, token)
            product.carted = true;
            product.qty++;
            toast.success('Item Added to Cart!');
        } else if (product.carted === true) {
            incDecCartHandler(product._id, token, 'increment');
            product.qty++;
            toast.success('Added one more item to Cart!');
        }
        product.wished = false;
        deleteWishlistHandler(product._id, token);
        event.stopPropagation();
      }
    
      const handleRemoveFromWishlist = (product, event) =>{
          deleteWishlistHandler(product._id, token)
          product.wished = false;
          toast.warning('Item Removed From Wishlist!');
          event.stopPropagation();
      }

    const showProducts = () => wishlistItems && (
        <div className="wishlist-product-container">
          {wishlistItems.map((product) => {
            const { _id, title, price, discountedPrice, imageLink, rating } = product;
            return (
              <div key={_id} onClick={() => handleSingleProductClick(product)} className="product-item">
                <img src={imageLink} alt={title} className="productImage"/>
                <p className="text titleText">{title.length > 27 ? `${title.slice(0, 26)}...` : title}</p>
                 <div>
                  <p className="text priceText">Rs. {discountedPrice}</p>
                  <p className="text discountedPriceText">Rs. {price}</p>
                  <p className="text ratingText">{rating} ⭐</p>
                 </div>
                <button onClick={(event) => handleAddToCart(product, event)} className="cart-button">
                    <FontAwesomeIcon icon={faShoppingCart} className="cartIcon"/> Move to Cart
                </button>
                <button onClick={(event) => handleRemoveFromWishlist(product, event)} className="wishlist-button">
                Remove from Wishlist
                </button>
              </div>
            );
          })}
        </div>
      );

      console.log(wishlistItems)

    const emptyWishlistMessage = () => wishlistItems  === undefined || wishlistItems.length === 0 ? (<div className="empty-wishlist-container">
      <img src="/images/optional/emptyWishlist.png" alt="Empty Wishlist" className="wishlist-image"/>
      <h2>Your wishlist is empty</h2>
      <p>Start exploring and save your favorite items!</p>
      <button onClick={() => navigate("/products")} className="explore-button">Explore</button>
    </div> ) : null

    const getLoader = () => isWishlistLoading && <img src="/images/loader/loader.gif" className="loader" alt="Loader"/>  

    return (
        <>
          {!isWishlistLoading ? (
            <div className="wishlist-page">
              {emptyWishlistMessage()}
              {showProducts()}
            </div>
          ) : getLoader()}
        </>
    )
}