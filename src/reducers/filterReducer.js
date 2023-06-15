export const filterReducer = (filterState, action) => {
    const initialFilters = {
        category: [],
        sortby: "",
        rating: 1,
        price: 0,
        search: "",
      };
    
    switch (action.type) {
      case "filter_by_category":
        return {
          ...filterState,
          category: filterState?.category?.includes(action.payload)
            ? filterState?.category?.filter((item) => item !== action.payload)
            : [...filterState?.category, action.payload],
        };
  
      case "sort_by_price":
        return {
          ...filterState,
          sortby: action.payload,
        };
  
      case "filter_by_rating":
        return {
          ...filterState,
          rating: action.payload,
        };
  
      case "filter_by_search":
        return {
          ...filterState,
          search: action.payload,
        };
        
      case "clear_filters":
        return {...initialFilters};

      default:
        return filterState;
    }
  };
  