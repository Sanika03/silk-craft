import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "saree",
    description: "",
  },
  {
    _id: uuid(),
    categoryName: "lehenga",
    description: "",
  },
  {
    _id: uuid(),
    categoryName: "dupatta",
    description: "",
  },
  {
    _id: uuid(),
    categoryName: "kurti",
    description: "",
  }
];
