import {Routes, Route} from "react-router-dom"

import { Navigation } from "./components/navigation";
import { Home } from "./backend/pages/home";
import { ProductListing } from "./backend/pages/productListing";
import { Wishlist } from "./backend/pages/wishlist";
import { Cart } from "./backend/pages/cart";
import { Profile } from "./backend/pages/profile";
import { Footer } from "./components/footer";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
