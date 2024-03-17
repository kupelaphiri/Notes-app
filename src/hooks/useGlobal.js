import { useContext } from "react";
import SearchContext from "../context/GlobalProvide";


const useGlobal = () => {
    const { searchResults, setSearchResults } = useContext(SearchContext);
    const { socket, setSocket} = useContext(SearchContext)
    return { searchResults, setSearchResults, socket, setSocket };
  };


export default useGlobal