import { useContext, } from "react";
import { UsersListContext } from "../contexts/users-list-context";
import { useDebounce } from "../hooks/use-debounce";
import { SearchActions, SearchActionModel } from "./search.reducer";

export default function Search() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setFilteredItems] = useContext(UsersListContext);
  const debounce = useDebounce<SearchActionModel<string>>(600);
  
  return <>
    <input onChange={({target}) => debounce({
      payload: target.value,
      type: SearchActions.newSearchTerm,
    }, setFilteredItems) } 
            placeholder="Search by user name..." />
  </>
}