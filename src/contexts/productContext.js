import { createContext, useEffect, useState } from "react";

import { GetAllProducts } from "../services/services";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    try {
      const response = await GetAllProducts();
      setProducts(response.data.products)
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
        products
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
