import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";


export const Cart = () => {
  const { cartItems } = useContext(CartContext);

  const getProducts = () => cartItems.map((product) => 
    <div key={product._id}>
      
    </div>)
  
    return (
      <>
        {getProducts()}
      </>
    )
  };
  