import { createContext, useState } from "react"

export const FilterContext = createContext()

export const FilterProvider = ({children}) => {
    const [filter, setFilter] = useState({ category: [], rating: 0 });
    return (
        <FilterContext.Provider value={{filter, setFilter}}>
            {children}
        </FilterContext.Provider>
    )
}   