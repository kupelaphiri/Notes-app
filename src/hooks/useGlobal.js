import { useContext } from "react";
import SearchContext from "../context/GlobalProvide";


const useGlobal = () => {
    const { searchResults, setSearchResults } = useContext(SearchContext);
    return { searchResults, setSearchResults };
  };


export default useGlobal