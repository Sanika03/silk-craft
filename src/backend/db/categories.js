import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "Saree",
    image: "/images/categoryImages/saree.png"
  },
  {
    _id: uuid(),
    categoryName: "Lehenga",
    image: "/images/categoryImages/lehenga.png"
  },
  {
    _id: uuid(),
    categoryName: "Dupatta",
    image: "/images/categoryImages/dupatta.png"
  },
  {
    _id: uuid(),
    categoryName: "Kurti",
    image: "/images/categoryImages/kurti.png"
  }
];
