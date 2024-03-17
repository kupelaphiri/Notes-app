import { createContext, useState } from "react";

const SearchContext = createContext({})

export const GlobalProvider = ({ children }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [socket, setSocket] = useState(null)

    return(
        <SearchContext.Provider value={{ searchResults, setSearchResults, socket, setSocket }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContext;