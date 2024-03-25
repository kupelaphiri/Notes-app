import { useContext } from "react";
import SearchContext from "../context/GlobalProvide";


const useGlobal = () => {
    const { searchResults, setSearchResults } = useContext(SearchContext);
    const {isDark, setIsDark} = useContext(SearchContext)
    return { searchResults, setSearchResults, isDark, setIsDark };
  };


export default useGlobal