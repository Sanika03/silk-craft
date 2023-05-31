import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { ProductContext } from "../../contexts/productContext";
import { categories } from "../db/categories";
import { FilterContext } from "../../contexts/filterContext";


export const ProductListing = () => {
  const {
    products,
    setProducts,
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
  } = useContext(ProductContext);

  const {filter, setFilter} = useContext(FilterContext);

  const navigate = useNavigate();

  const handleSingleProductClick = (item) => {
    navigate(`/products/${item._id}`, { state: { variable: item } });
  }

  const handleAddToCart = (product, event) => {
    if (product.toggleButton === false) {
      setCartItems([...cartItems, product]);
      product.toggleButton = true;
    } else if (product.toggleButton === true) {
      navigate("/cart") ;
    }
    event.stopPropagation()
  }

  const handleAddToWishlist = (product, event) =>{
    setWishlistItems([...wishlistItems, product]);
    event.stopPropagation()
  }

  const categoryFilteredProducts =
    filter.category.length === 0
      ? products
      : products.filter((product) =>
          filter.category.includes(product.categoryName)
        );

  const ratingFilteredProducts =
    filter.rating !== 0
      ? categoryFilteredProducts.filter((product) => product.rating >= filter.rating)
      : categoryFilteredProducts;

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

  const handleClearFilters = () => {
    setFilter({ category: [], rating: 0 });
  };

  const showFilters = () => {
    return (
      <div className="filterDiv">
        <p className="filter-title">Filters</p>
        <button className="button clearFilterButton" onClick={() => handleClearFilters()}>Clear All Filters</button>
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
            min={0}
            max={5}
            step={1}
            value={filter.rating}
            onChange={(e) => handleRatingChange(e)}
          />
        </div>
      </div>
    );
  };

  const showProducts = () => (
    <div className="product-container">
      {ratingFilteredProducts.map((product) => {
        const { id, title, price, discountedPrice, imageLink, rating, toggleButton } = product;
        return (
          <div key={id} onClick={() => handleSingleProductClick(product)} className="product-item">
            <img src={imageLink} alt={title} className="productImage"/>
            <p className="text titleText">{title.length > 27 ? `${title.slice(0, 26)}...` : title}</p>
             <div>
              <p className="text priceText">Rs. {discountedPrice}</p>
              <p className="text discountedPriceText">Rs. {price}</p>
              <p className="text ratingText">{rating} ⭐</p>
             </div>
            <button onClick={(event) => handleAddToCart(product, event)} className="button cartButton">
            {toggleButton === false ? (
              <span>
                <FontAwesomeIcon icon={faShoppingCart} className="cartIcon"/> Add to Cart
              </span>
            ) : (
              "Go to Cart"
            )}
            </button>
            <button onClick={(event) => handleAddToWishlist(product, event)} className="button wishlistButton">
              Add to Wishlist
            </button>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="productPage">
      {showFilters()}
      {showProducts()}
    </div>
  );
};
