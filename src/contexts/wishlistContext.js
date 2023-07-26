import { useEffect, useState, createContext } from "react";

import { useAuth } from "../contexts/authContext";
import { GetWishList, PostWishList, DeleteWish } from "../services/services";

export const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
  const [wishlistItems, setWishlistItems] = useState();
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const { token } = useAuth();

  const getWishlistHandler = async () => {
    try {
      const response = await GetWishList({encodedToken: token})
      setIsWishlistLoading(false);
      if (response.status === 200) {
        setWishlistItems(response.data.wishlistItems)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postWishlistHandler = async (item, token) => {
    try {
      const response = await PostWishList({
        product: item,
        encodedToken: token
      })
      if (response.status === 201) {
        setWishlistItems(response.data.wishlist)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const deleteWishlistHandler = async (id, token) => {
    try {
      const response = await DeleteWish({
        productId: id,
        encodedToken: token
      })
      if (response.status === 200) {
        setWishlistItems(response.data.wishlist)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (token) {
      getWishlistHandler();
    }
  }, [token]);

  return (
    <WishlistContext.Provider value={{wishlistItems, postWishlistHandler, deleteWishlistHandler, isWishlistLoading}}>
      {children}
    </WishlistContext.Provider>
  )
}