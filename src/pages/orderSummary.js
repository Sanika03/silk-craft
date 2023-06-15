import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/orderSummary.css"

import { AddressContext } from "../contexts/addressContext"
import { ProductContext } from "../contexts/productContext";
import { CartContext } from "../contexts/cartContext";

export const OrderSummary = () => {
    const { addressData } = useContext(AddressContext);
    const { products } = useContext(ProductContext);
    const { setCartItems } = useContext(CartContext);

    const navigate = useNavigate();
    
    const cartData = products.filter((el) => el.carted);
    
    const getTotalMrp = () => cartData.reduce((acc, curr) => acc + Number(curr.price), 0);

    const getDiscount = () => cartData.reduce((acc, curr) => acc + Number(curr.price - curr.discountedPrice), 0);
  
    const getTotalAmount = () => cartData.reduce((acc, curr) => acc + Number(curr.discountedPrice), 0);

    const handlePlaceOrder = () => {
        navigate("/orderSuccessful");
        products.map((product) => {
          product.carted = false;
          product.qty = 0;
          return product;
        });
        toast.success('Order Placed Successfully');
        setCartItems([]);
      };

    const productDetailsCard = () => <div className="sub-card">
        <h2 className="products-summary-heading">Product Details</h2>
        <div className="heading">
        <p>Product</p>
        <p>Quantity</p>
        </div>
        <div className="summary-products">
        {cartData?.map((product) => {
            const { _id, title, imageLink, qty } = product;
            return (
            <div key={_id} className="single-summary-product">
                <div className="summary-product-details">
                <img src={imageLink} alt={title} className="single-product-image" />
                <p className="single-product-heading">{title}</p>
                </div>
                <p className="product-quantity">{qty}</p>
            </div>
            );
        })}
        </div>
    </div>
  
    const priceDetailsCard = () => 
        <div className="summary-price-card">
          <h3 className="price-card-title">Price Details</h3>
          <p className="item-text">({cartData.length} item
          {cartData.length > 1 ? "s" : null})</p>
              <div className="price-container">
                <p className="text-price-details">Total MRP</p>
                <p className="text-price-details">Rs. {getTotalMrp()}</p>
              </div>
              <div className="discount-container">
                <p className="text-price-details">Discount on MRP</p>
                <p className="text-price-details">- Rs. {getDiscount()}</p>
              </div>
              <div className="delivery-container">
              <p>Delivery Charges</p>
              <p>FREE</p>
              </div>
              <div className="total-price-container">
                <p className="text-price-details">Total Amount</p>
                <p className="text-price-details">Rs. {getTotalAmount()}</p>
              </div>
        </div>

    const deliveryDetailsCard = () => (
        <div className="delivery-details-card">
        <h2 className="delivery-details-heading">Delivery Details</h2>
        <h3>{addressData.selectedAddress.name}</h3>
        <p>{Object.values(addressData.selectedAddress).slice(2).join(", ")}</p>
        </div>
    );

    const getSummaryCard = () => <div className="order-summary-card">
        {productDetailsCard()}
        <hr/>
        {priceDetailsCard()}
        <hr/>
        {deliveryDetailsCard()}
        <hr/>
        <button className="place-order-button" onClick={() => handlePlaceOrder()}>Place Order</button>
    </div>

    return(
        <div className="summary-page">
            <h1 className="summary-heading">Order Summary</h1>
            {getSummaryCard()}
        </div>
    )
}