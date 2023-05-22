import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { makeServer } from "./server";
import { ProductProvider } from "./contexts/productContext";

makeServer();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <ProductProvider> 
                <App />
            </ProductProvider>
        </Router>
    </React.StrictMode>
);
