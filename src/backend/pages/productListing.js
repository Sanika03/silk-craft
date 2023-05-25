import "../../styles/products.css";

import { useContext, useState } from "react";

import { ProductContext } from "../../contexts/productContext";
import { categories } from "../db/categories";
import { useNavigate } from "react-router-dom";

export const ProductListing = () => {
  const {
    products,
    setProducts,
    setItem,
    cartItems,
    setCartItems,
    wishlistItems,
    setWishlistItems,
  } = useContext(ProductContext);
  const [filter, setFilter] = useState({ category: [], rating: 0 });

  const navigate = useNavigate();

  const handleSingleProductClick = (product) => setItem(product);

  const handleAddToCart = (product) => {
    if (product.toggleButton === false) {
      setCartItems([...cartItems, product]);
      product.toggleButton = true;
    } else if (product.toggleButton === true) {
      navigate("/cart") ;
    }
  }

  const handleAddToWishlist = (product) =>
    setWishlistItems([...wishlistItems, product]);

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
        <p>Filters</p>
        <button className="button clearFilterButton" onClick={handleClearFilters}>Clear All Filters</button>
        <div className="categoryFilter">
          <p>Categories</p>
          {categories.map(({ id, categoryName }) => (
            <label key={id}>
              <input
                type="checkbox"
                name="categoryFilter"
                value={categoryName}
                onChange={handleCategoryFilter}
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
            onChange={handleRatingChange}
          />
        </div>
      </div>
    );
  };

  const showProducts = () => (
    <div className="product-container">
      {ratingFilteredProducts.map((product) => {
        const { id, title, price, imageLink, rating, toggleButton } = product;
        return (
          <div key={id} onClick={() => handleSingleProductClick(product)} className="product-item">
            <img src={imageLink} alt={title} className="productImage"/>
            <p className="text">{title.length > 31 ? `${title.slice(0, 28)}...` : title}</p>
             <div>
              <p className="text priceText">Rs. {price}</p>
              <p className="text ratingText">{rating} ⭐</p>
             </div>
            <button onClick={() => handleAddToCart(product)} className="button cartButton">
              {toggleButton === false ? "Add to Cart" : "Go to Cart"}
            </button>
            <button onClick={() => handleAddToWishlist(product)} className="button wishlistButton">
              Add to wishlist
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
