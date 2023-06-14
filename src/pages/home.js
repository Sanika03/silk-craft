import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { FilterContext } from "../contexts/filterContext";
import { ProductContext } from "../contexts/productContext";

import "../styles/home.css"


export const Home = () => {
    const { filterDispatch } = useContext(FilterContext);
    const {categories, isCategoryLoading} = useContext(ProductContext);

    const navigate = useNavigate();

    const getHomeTopImage = () => <img src="/images/optional/home1.webp" alt="Shop now" className="home-image"/>

    const getHomeEndImage = () => <img src="/images/optional/home2.jpg" alt="Shop now" className="home-end-image"/>

    const getQuote = () => (
        <div className="quote-container">
            <p className="quote-text">
                "Wrap Yourself in Timeless Luxury: Where Silk Unveils Your Signature Style and Redefines Fashion as an Art.."
            </p>
            <button onClick={() => navigate("/products")} className="shop-now-button">Shop Now</button>
        </div>
    )

    const goToSelectedProducts = (categoryName) => {
        navigate("/products");
        filterDispatch({ type: "filter_by_category", payload: categoryName })
    }

    const getCategoryProducts = () => (
            <div className="products-container">
                {categories.map(({categoryName, image}) =>
                    <div className="category-container" onClick={() => goToSelectedProducts(categoryName)}>
                        <p className="category-text">{categoryName} Collection</p>
                        <img src={image} className="category-image" alt={categoryName} />
                    </div>
                )}
            </div>
    )

    const getLoader = () => isCategoryLoading && <img src="/images/loader/loader.gif" className="loader" alt="Loader"/>  

    return (
        <>
            {!isCategoryLoading ? (
                <div className="mainDiv">
                    {getHomeTopImage()}
                    {getQuote()}
                    <img src="/images/optional/shopByCategory.webp" alt="Shop By Category" className="shop-by-category-image"/>
                    {getCategoryProducts()}
                    {getHomeEndImage()}
                </div>
            ) : getLoader()}
        </>
    )
}