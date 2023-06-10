import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const {
    products, isProductLoading
  } = useContext(ProductContext);

  const { postCartHandler } = useContext(CartContext);

  const { postWishlistHandler, deleteWishlistHandler } = useContext(WishlistContext);

  const {filter, setFilter} = useContext(FilterContext);

  const {token} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSingleProductClick = (item) => {
    navigate(`/products/${item._id}`);
  }

  const handleAddToCart = (product, event) => {
    if(!token){
      navigate('/login', { state: { from: location } });
    }
    else {
      if (product.carted === false) {
        postCartHandler(product, token)
        product.carted = true;
        product.qty++;
      } else if (product.carted === true) {
        navigate("/cart") ;
      }
    }
    event.stopPropagation()
  }

  const handleAddToWishlist = (product, event) =>{
    if(!token){
      navigate('/login', { state: { from: location } });
    }
    else {
      if (product.wished === false) {
        postWishlistHandler(product, token)
        product.wished = true;
      } else if (product.wished === true) {
        deleteWishlistHandler(product._id, token)
        product.wished = false;
      }
    }
    event.stopPropagation()
  }

  let categoryFilteredProducts =
    filter.category.length === 0
      ? products
      : products.filter((product) =>
          filter.category.includes(product.categoryName)
        );

  let ratingFilteredProducts =
    filter.rating !== 0
      ? categoryFilteredProducts.filter((product) => product.rating >= filter.rating)
      : categoryFilteredProducts;

  let searchFilterData =
    filter.search.length > 0
      ? ratingFilteredProducts?.filter(
        (item) =>
            item?.title.toLowerCase().includes(filter?.search.toLowerCase()) ||
            item?.description.toLowerCase().includes(filter?.search.toLowerCase())
        )
      : ratingFilteredProducts;

  const handleCategoryFilter = (e) => {
    const selectedCategory = e.target.value;
    let updatedCategories = [];

    if (filter.category.includes(selectedCategory)) {
      updatedCategories = filter.category.filter(
        (category) => category !== selectedCategory
      );
    } else {
      updatedCategories = [...filter.category, selectedCategory];
    }

    setFilter({ ...filter, category: updatedCategories });
  };

  const handleRatingChange = (e) => {
    const selectedRating = Number(e.target.value);
    setFilter({ ...filter, rating: selectedRating });
  };

  const [sortOption, setSortOption] = useState("");

  const handlePriceSort = async(e) => {
    const selectedSort = e.target.value;
    setSortOption(selectedSort)
    setFilter({ ...filter, sortby: selectedSort });

    if (selectedSort === "lowToHigh") {
      products.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (selectedSort === "highToLow") {
      products.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (filter.sortby === "") {
      searchFilterData = [...products];
    }
  };

  const handleClearFilters = () => {
    setFilter({...filter, category: [], rating: 0, sortby: "" });
    setSortOption("")
  };

  const showFilters = () => {
    return (
      <div className="filterDiv">
        <div className="filter-top">
          <p className="filter-title">Filters</p>
          <button className="clearFilterButton" onClick={() => handleClearFilters()}>Clear</button>
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
                onChange={(e) => handleCategoryFilter(e)}
                checked={filter.category.includes(categoryName)}
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
            value={filter.rating}
            onChange={(e) => handleRatingChange(e)}
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
              onChange={handlePriceSort}
              checked={sortOption === "lowToHigh"}
            />
            Low to High
          </label>
          <label>
            <input
              type="radio"
              name="priceSort"
              value="highToLow"
              onChange={handlePriceSort}
              checked={sortOption === "highToLow"}
            />
            High to Low
          </label>
        </div> 
      </div>
    );
  };

  const noProducts = () => searchFilterData.length === 0 && <h2 className="no-products">No products to display!</h2>

  const getLoader = () => isProductLoading && <img src="/images/loader/loader.gif" className="loader"/>  

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
            {carted === false ? (
              <span>
                <FontAwesomeIcon icon={faShoppingCart} className="cartIcon"/> Add to Cart
              </span>
            ) : (
              "Go to Cart"
            )}
            </button>
            <button onClick={(event) => handleAddToWishlist(product, event)} className="wishlistButton">
            {wished ? "Remove from Wishlist" : "Add to Wishlist"}
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