import { createContext, useState } from "react";

const SearchContext = createContext({})

export const GlobalProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [isDark, setIsDark] = useState(false)

    return(
        <SearchContext.Provider value={{ searchResults, setSearchResults, isDark, setIsDark }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext;