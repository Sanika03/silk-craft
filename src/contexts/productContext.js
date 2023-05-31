import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("api/products")
      const {products} = await response.json()
      setProducts(products)
     }
    catch(e){
     console.log(e)
     }
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        cartItems,
        setCartItems,
        wishlistItems,
        setWishlistItems
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
