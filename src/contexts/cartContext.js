import { useEffect, useState, createContext } from "react";

import { useAuth } from "../contexts/authContext";
import { DeleteCart, GetCartList, IncDecCart, PostCart } from "../services/services";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
  const [cartItems, setCartItems] = useState();
  const [isCartLoading, setIsCartLoading] = useState(false);
  const { token } = useAuth();

  const getCartHandler = async () => {
    try {
      const response = await GetCartList({encodedToken: token})
      setIsCartLoading(false)
      if (response.status === 200) {
        setCartItems(response.data.cart)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postCartHandler = async (item, token) => {
      try {
        const response = await PostCart({
          product: item,
          encodedToken: token
        })
        if (response.status === 200 || response.status === 201) {
          setCartItems(response.data.cart);
        }
      } catch (e) {
        console.error(e)
      }
    }

  const deleteCartHandler = async (id, token) => {
    try {
      const response = await DeleteCart({
        productId: id,
        encodedToken: token
      })
      if (response.status === 200) {
        setCartItems(response.data.cart)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const incDecCartHandler =  async (id, token, action) => {
    try {
      const response = await IncDecCart({
        productId: id, 
        encodedToken: token, 
        type: action 
      })
      if(response.status === 200) {
        setCartItems(response.data.cart)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if(token) {
      getCartHandler();
    }
  },[token]);

  return (
    <CartContext.Provider value={{cartItems, setCartItems, postCartHandler, deleteCartHandler, incDecCartHandler, isCartLoading, getCartHandler}}>
      {children}
    </CartContext.Provider>
  )
}