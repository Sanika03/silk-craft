import { createContext, useContext, useReducer } from "react"
import { ProductContext } from "./productContext";
import { filterReducer } from "../reducers/filterReducer";

export const FilterContext = createContext()

export const FilterProvider = ({children}) => {
    const { products } = useContext(ProductContext);

    const items = [...products];

    const initialFilters = {
        category: [],
        sortby: "",
        rating: 1,
        price: 0,
        search: "",
      };

      const [filterState, filterDispatch] = useReducer(
        filterReducer,
        initialFilters
      );
    
      const categoryFilterData = filterState?.category?.length > 0
        ? items?.filter((item) =>
            filterState?.category.some(
                (checkCategory) => item?.categoryName === checkCategory
            )
            )
        : items;
    
      const sortFilterData =
        filterState?.sortby?.length > 0
          ? filterState?.sortby === "lowToHigh"
            ? categoryFilterData?.sort((a, b) => a.price - b.price)
            : categoryFilterData?.sort((a, b) => b.price - a.price)
          : categoryFilterData;
    
      const ratingFilterData =
        filterState?.rating > 1
          ? sortFilterData?.filter((item) => item.rating >= filterState?.rating)
          : sortFilterData;
    
      const searchFilterData =
        filterState?.search.length > 0
          ? ratingFilterData?.filter(
              (item) =>
                item?.title
                  .toLowerCase()
                  .includes(filterState?.search.toLowerCase()) ||
                item?.description
                  .toLowerCase()
                  .includes(filterState?.search.toLowerCase()) ||
                item?.categoryName
                  .toLowerCase()
                  .includes(filterState?.search.toLowerCase())
            )
          : ratingFilterData;
    
      return (
        <FilterContext.Provider
          value={{ filterState, filterDispatch, searchFilterData, initialFilters }}
        >
          {children}
        </FilterContext.Provider>
      );
}   