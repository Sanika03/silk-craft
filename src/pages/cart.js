import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "../styles/cart.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import { CartContext } from "../contexts/cartContext";
import { WishlistContext } from "../contexts/wishlistContext";
import { useAuth } from "../contexts/authContext";

export const Cart = () => {
  const { incDecCartHandler, deleteCartHandler, isCartLoading, cartItems } = useContext(CartContext);
  const { postWishlistHandler } = useContext(WishlistContext);

  const {token} = useAuth();
  
  const navigate = useNavigate();

  const handleSingleProductClick = (item) => {
    navigate(`/products/${item._id}`);
  }

  const getTotalMrp = () => cartItems.reduce((acc, curr) => acc + Number(curr.price), 0);

  const getDiscount = () => cartItems.reduce((acc, curr) => acc + Number(curr.price - curr.discountedPrice), 0);

  const getTotalAmount = () => cartItems.reduce((acc, curr) => acc + Number(curr.discountedPrice), 0);

  const handleIncDec = (product, action) => {
    if(action === "increment") {
      incDecCartHandler(product._id, token, "increment")
      product.qty++;
    } else if(action === "decrement") {
      if(product.qty > 1){
        incDecCartHandler(product._id, token, "decrement")
        product.qty--;
      }
    }
  }

  const handleRemoveFromCart = (product) => {
    deleteCartHandler(product._id, token);
    product.carted = false;
    product.qty = 0;
    toast.warning('Item Removed from Cart!');
  }

  const handleMoveToWishlist = (product) => {
    if (product.wished === false) {
      postWishlistHandler(product, token)
      product.wished = true;
      deleteCartHandler(product._id, token);
      product.carted = false;
      product.qty--;
      toast.success('Item Moved To Wishlist!');
    } else {
      toast.warning('Item already exists in Wishlist!');
    }
  }

  const getProducts = () => (
    <div className="cart-main-container">
      {cartItems && (cartItems.map((product) =>
        {
          const { _id, title, price, discountedPrice, imageLink, qty } = product;
          return (
            <div key={_id} className="cart-product-container">
              <img src={imageLink} alt={_id} className="product-image" onClick={() => handleSingleProductClick(product)}/>  
              <div className="detail-container">
                  <div className="text-details">
                  <p className="title">{title.length > 27 ? `${title.slice(0, 26)}...` : title}</p>
                  <div className="price">
                    <p className="price-text">Rs. {discountedPrice}</p>
                    <p className="small-price">Rs. {price}</p>
                  </div>
                  <div className="quantity-container">
                    <p className="quantity-text">Quantity:</p> 
                    <button onClick={() => handleIncDec(product
                    , "decrement")} className="inc-dec-button">
                      <FontAwesomeIcon icon={faMinusCircle}/>
                    </button>
                    <p className="quantity">{qty}</p>
                    <button onClick={() => handleIncDec(product
                    , "increment")} className="inc-dec-button">
                      <FontAwesomeIcon icon={faPlusCircle}/>
                    </button>
                  </div>
                </div>
                <div className="buttons-container">
                  <button onClick={() => handleMoveToWishlist(product)} className="action-button">Move to Wishlist</button>
                  <button onClick={() => handleRemoveFromCart
                  (product)} className="action-button">Remove from Cart</button>
                </div>
              </div>
            </div>
          )
        }
      ))}
    </div>
  )

  const emptyCartMessage = () => cartItems.length < 1 && (
    <div className="empty-cart-container">
      <img src="/images/optional/emptyCart.jpg" className="cart-image" alt="Empty cart"/>
      <h2 className="empty-cart-text">It feels so light!</h2>
      <p>There's nothing in your cart. Let's add some products.</p>
      <button onClick={() => navigate("/products")} className="explore-button">Explore</button>
    </div>
  )

  const getPriceCard = () => (cartItems.length > 0 && (
    <div className="price-card">
      <h3 className="price-card-title">Price Details</h3>
      <p className="item-text">({cartItems.length} item
      {cartItems.length > 1 ? "s" : null})</p>
      <hr/>
          <div className="price-container">
            <p className="text-price-details">Total MRP</p>
            <p className="text-price-details">Rs. {getTotalMrp()}</p>
          </div>
          <div className="discount-container">
            <p className="text-price-details">Discount on MRP</p>
            <p className="text-price-details">- Rs. {getDiscount()}</p>
          </div>
          <hr/>
          <div className="total-price-container">
            <p className="text-price-details">Total Amount</p>
            <p className="text-price-details">Rs. {getTotalAmount()}</p>
          </div>
          <hr/>
          <button onClick={() => navigate("/checkout/userAddress")} className="checkout-button">Checkout</button>
    </div>
  ))

  const getCartTitle = () => cartItems.length > 0 && <h2 className="cart-title">MY CART ({cartItems.length})</h2>

  const getLoader = () => isCartLoading && <img src="/images/loader/loader.gif" className="loader" alt="loader"/>  
  
    return (
      <>
        {!isCartLoading ? (
          <div className="cart-main-page">
            {getCartTitle()}
              <div className="cart-page">
                {emptyCartMessage()}
                {getProducts()}
                {getPriceCard()}
              </div>
          </div>
        ) : getLoader()}
      </>
    )
  };
  