import { useContext } from "react"
import { useNavigate } from "react-router-dom";

import "../styles/wishlist.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { CartContext } from "../contexts/cartContext";
import { WishlistContext } from "../contexts/wishlistContext";
import { useAuth } from "../contexts/authContext";
import { ProductContext } from "../contexts/productContext";

export const Wishlist = () => {

    const { postCartHandler, incDecCartHandler } = useContext(CartContext);
    const { products } = useContext(ProductContext)
    const { wishlistItems, deleteWishlistHandler } = useContext(WishlistContext);

    const wishlistData = products.filter((el) => el.wished);
  
    const {token} = useAuth();
  
    const navigate = useNavigate();

    const handleSingleProductClick = (item) => {
        navigate(`/products/${item._id}`);
      }

      const handleAddToCart = (product, event) => {
        if (product.carted === false) {
            postCartHandler(product, token)
            product.carted = true;
        } else if (product.carted === true) {
            incDecCartHandler(product._id, token, 'increment')
        }
        product.wished = false;
        deleteWishlistHandler(product._id, token)
        event.stopPropagation()
      }
    
      const handleRemoveFromWishlist = (product, event) =>{
          deleteWishlistHandler(product._id, token)
          product.wished = false;
        event.stopPropagation()
      }

    const showProducts = () => wishlistItems && (
        <div className="wishlist-product-container">
          {wishlistData.map((product) => {
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

    const emptyWishlistMessage = () => wishlistItems === undefined || wishlistItems.length === 0 ? <h1>Your wishlist is empty!</h1> : null

    return (
        <div className="wishlist-page">
            {emptyWishlistMessage()}
            {showProducts()}
        </div>
    )
}