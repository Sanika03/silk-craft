import React from "react";
import {Routes, Route} from "react-router-dom";
import Mockman from "mockman-js";

import { Navigation } from "./components/navigation";
import { Footer } from "./components/footer";
import { Home } from "./pages/home"
import { ProductListing } from "./pages/productListing";
import { Wishlist } from "./pages/wishlist";
import { Cart } from "./pages/cart";
import { Profile } from "./pages/profile";
import { ProductDetails } from "./pages/singleProduct";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signUp";


function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
      <Route path="/mockMan" element={<Mockman />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products/:_id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
