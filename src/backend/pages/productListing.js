import "../../styles/products.css"

import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../contexts/productContext";

export const ProductListing = () => {

const {products, setItem, cartItems, setCartItems, wishlistItems, setWishlistItems} = useContext(ProductContext)

  const handleSingleProductClick = (product) => setItem(product);

  const handleAddToCart = (product) => setCartItems([...cartItems, product]);

  const handleAddToWishlist = (product) =>
    setWishlistItems([...wishlistItems, product]);

  const showProducts = () => (
    <div className="product-container">
        {products.map((product) => {
          const { id, title, price, imageLink } = product;
          return (
              <div key={id} onClick={() => handleSingleProductClick(product)} className="product-item">
                <img src={imageLink} alt={title} className="productImage"/>
                <p>{title}</p>
                <p>Rs. {price}</p>
                <button onClick={() => handleAddToCart(product)} className="cartButton">
                  Add to Cart
                </button>
                <button onClick={() => handleAddToWishlist(product)} className="wishlistButton">
                Add to wishlist
                </button>
              </div>
          );
        })}
      
    </div> 
  );

  return (
    <>
      {showProducts()}
    </>
  );
};
