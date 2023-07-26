  import { useContext } from "react";
  import { useNavigate, useLocation } from "react-router-dom";

  import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  import "../styles/products.css";
  
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

  import { ProductContext } from "../contexts/productContext";
  import { categories } from  "../backend/db/categories";
  import { FilterContext } from "../contexts/filterContext";
  import { CartContext } from "../contexts/cartContext";
  import { WishlistContext } from "../contexts/wishlistContext";
  import { useAuth } from "../contexts/authContext";

  export const ProductListing = () => {
    const { isProductLoading } = useContext(ProductContext);
    const { postCartHandler } = useContext(CartContext);
    const { postWishlistHandler, deleteWishlistHandler, wishlistItems } = useContext(WishlistContext);
    const { filterDispatch, filterState, searchFilterData, cartItems} = useContext(FilterContext);

    const {token} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSingleProductClick = (item) => {
      navigate(`/products/${item._id}`);
    }

    const isCarted = (product) => {
      if (cartItems && cartItems.length > 0) {
        return cartItems?.some((item) => item._id === product._id);  
      }
      return false;
    };

    const isWished = (product) => {
      if (wishlistItems && wishlistItems.length > 0) {
        return wishlistItems?.some((item) => item._id === product._id);
      }
      return false;
    };

    const handleAddToCart = (product, event) => {
      if(!token){
        navigate('/login', { state: { from: location } });
      }
      else {
        if (!product.carted) {
          postCartHandler(product, token);
          product.carted = true;
          product.qty++;
        } else {
          navigate("/cart") ;
        }
      }
      toast.success('Item Added to Cart!');
      event.stopPropagation()
    }

    const handleAddToWishlist = (product, event) => {
      if(!token){
        navigate('/login', { state: { from: location } });
      }
      else {
        if (!product.wished) {
          postWishlistHandler(product, token);
          product.wished = true;
          toast.success('Item Added to Wishlist!');
        } else {
          deleteWishlistHandler(product._id, token);
          product.wished = false;
          toast.warning('Item Removed from Wishlist!');
        }
      }
      event.stopPropagation()
    }

    const showFilters = () => {
      return (
        <div className="filterDiv">
          <div className="filter-top">
            <p className="filter-title">Filters</p>
            <button className="clearFilterButton" onClick={() => filterDispatch({ type: "clear_filters" })}>Clear</button>
          </div>
          <hr/>
          <div className="categoryFilter">
            <p>Categories</p>
            {categories.map(({ id, categoryName }) => (
              <label key={id}>
                <input
                  type="checkbox"
                  name="categoryFilter"
                  value={categoryName}
                  checked={filterState?.category?.includes(categoryName)}
                  onClick={() =>
                    filterDispatch({ type: "filter_by_category", payload: categoryName })
                  }
                />
                {categoryName}
              </label>
            ))}
          </div>
          <hr />
          <div className="ratingFilter">
            <p>Ratings:</p>
            <input
              type="range"
              name="ratingFilter"
              className="slider"
              min={0}
              max={5}
              step={1}
              value={filterState.rating}
              onChange={(e) =>
              filterDispatch({
                type: "filter_by_rating",
                payload: e.target.value,
              })
            }
            />
          </div>
          <hr />
          <div className="priceDiv">
            <p>Price:</p>
            <label>
              <input
                type="radio"
                name="priceSort"
                value="lowToHigh"
                checked={filterState?.sortby?.includes("lowToHigh")}
                onClick={() =>
                  filterDispatch({ type: "sort_by_price", payload: "lowToHigh" })
                }
              />
              Low to High
            </label>
            <label>
              <input
                type="radio"
                name="priceSort"
                value="highToLow"
                checked={filterState?.sortby?.includes("highToLow")}
                onClick={() =>
                  filterDispatch({ type: "sort_by_price", payload: "highToLow" })
                }
              />
              High to Low
            </label>
          </div> 
        </div>
      );
    };

    const noProducts = () => searchFilterData.length === 0 && <h2 className="no-products">No products to display!</h2>

    const getLoader = () => isProductLoading && <img src="/images/loader/loader.gif" className="loader" alt="Loader"/>  

    const showProducts = () => (
      <div className="product-container">
        {searchFilterData.map((product) => {
          const { _id, title, price, discountedPrice, imageLink, rating, carted, wished } = product;
          return (
            <div key={_id} onClick={() => handleSingleProductClick(product)} className="product-item">
              <img src={imageLink} alt={title} className="productImage"/>
              <p className="text titleText">{title.length > 27 ? `${title.slice(0, 26)}...` : title}</p>
              <div>
                <p className="text priceText">Rs. {discountedPrice}</p>
                <p className="text discountedPriceText">Rs. {price}</p>
                <p className="text ratingText">{rating} ⭐</p>
              </div>
              <button onClick={(event) => handleAddToCart(product, event)} className="cartButton">
                {carted || isCarted(product) ? "Go to cart" : "Add to cart"}
              </button>
              <button onClick={(event) => handleAddToWishlist(product, event)} className="wishlistButton">
                {wished && isWished(product) ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          );
        })}
      </div>
    );

    return (
      <>
        {!isProductLoading ? (
          <div className="productPage">
            {showFilters()}
            {noProducts()}
            {showProducts()}
          </div>
        ) : getLoader()}
      </>
    );
  };