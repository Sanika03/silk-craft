import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "saree",
  },
  {
    _id: uuid(),
    categoryName: "lehenga",
  },
  {
    _id: uuid(),
    categoryName: "dupatta",
  },
  {
    _id: uuid(),
    categoryName: "kurti",
  }
];
