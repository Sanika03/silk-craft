import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Mockman from "mockman-js";

import { Navigation } from "./components/Navigation";
import { Footer } from "./components/footer";
import { PrivateRoute } from "./components/privateRoute";
import { Home } from "./pages/home"
import { ProductListing } from "./pages/productListing";
import { ProductDetails } from "./pages/singleProduct";
import { Wishlist } from "./pages/wishlist";
import { Cart } from "./pages/cart";
import { AddressPage } from "./pages/userAddress";
import { OrderSummary } from "./pages/orderSummary";
import { Profile } from "./pages/profile";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signUp";
import { ErrorPage } from "./pages/error";
import { Logout } from "./pages/logout";
import { OrderSuccessful } from "./pages/orderSuccessful";

function App() {
  return (
    <div className="App">
      <div>
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        theme='colored'
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      </div>
      <Navigation />
      <Routes>
        <Route path="/mockMan" element={<Mockman />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/checkout/userAddress" element={<PrivateRoute><AddressPage /></PrivateRoute>} />
        <Route path="/checkout/orderSummary" element={<PrivateRoute><OrderSummary /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products/:_id" element={<ProductDetails />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/orderSuccessful" element={<OrderSuccessful />} />
        <Route path='/404' element={<ErrorPage />} />
        <Route path='*' element={<Navigate to={'/404'} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
