import { createContext, Dispatch } from "react";
import { SearchReducerState, SearchActionModel } from "../Search/search.reducer";

export const UsersListContext = createContext([{} as SearchReducerState, () => {}] as [SearchReducerState, Dispatch<SearchActionModel<string>>]);