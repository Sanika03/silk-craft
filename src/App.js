import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Mockman from "mockman-js";

import { Navigation } from "./components/navigation";
import { Footer } from "./components/footer";
import { PrivateRoute } from "./components/privateRoute";
import { Home } from "./pages/home"
import { ProductListing } from "./pages/productListing";
import { ProductDetails } from "./pages/singleProduct";
import { Wishlist } from "./pages/wishlist";
import { Cart } from "./pages/cart";
import { Checkout } from "./pages/checkout";
import { Profile } from "./pages/profile";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signUp";
import { ErrorPage } from "./pages/error";


function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/mockMan" element={<Mockman />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products/:_id" element={<ProductDetails />} />
        <Route path='/404' element={<ErrorPage />} />
        <Route path='*' element={<Navigate to={'/404'} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
