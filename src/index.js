import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ScrollToTop } from './components/scrollToTop';

import App from "./App";
import { makeServer } from "./server";
import { ProductProvider } from "./contexts/productContext";
import { FilterProvider } from "./contexts/filterContext";

makeServer();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <ScrollToTop />
                <ProductProvider> 
                    <FilterProvider>
                        <App />
                    </FilterProvider>
                </ProductProvider>
        </Router>
    </React.StrictMode>
);
