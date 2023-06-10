import { createContext, useEffect, useState } from "react";

import { GetAllProducts, GetAllCategories } from "../services/services";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await GetAllProducts();
      setProducts(response.data.products)
      setIsProductLoading(false)
     }
    catch(e){
     console.log(e)
     }
  }

  const getCategories = async () => {
    try {
      const response = await GetAllCategories();
      setCategories(response.data.categories)
      setIsCategoryLoading(false);
     }
    catch(e){
     console.log(e)
     }
  }

  useEffect(() => {
    getData()
    getCategories()
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products, categories, isProductLoading, isCategoryLoading
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
