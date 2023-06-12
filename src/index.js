import { makeServer } from "./server";
import { ScrollToTop } from './components/scrollToTop';
import { ProductProvider } from "./contexts/productContext";
import { FilterProvider } from "./contexts/filterContext";
import { AuthProvider } from "./contexts/authContext";
import { CartProvider } from "./contexts/cartContext";
import { AddressProvider } from "./contexts/addressContext";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { WishlistProvider } from "./contexts/wishlistContext";

<link
  rel="stylesheet"
  href="https://unpkg.com/mockman-js@latest/dist/style.css"
/>

makeServer();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
    <Router>
      <ScrollToTop />
      <ProductProvider>
        <FilterProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <AddressProvider>
                  <App />
                </AddressProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </FilterProvider>
      </ProductProvider>
    </Router>
  </React.StrictMode>
);
