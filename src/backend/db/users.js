import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    name: "Adarsh Balika",
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },{
    _id: "3c510211-1c8f-412d-ad61-bac5eb09554f",
    name: "Sanika Suryawanshi",
    email: "sanika@gmail.com",
    password: "1234",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  }
];
