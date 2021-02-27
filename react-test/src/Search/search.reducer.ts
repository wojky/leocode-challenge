import { Reducer } from "react";
import { User } from "../models/user.model";

export interface SearchReducerState {
  filteredUsers: Array<User>;
  searchTerm: string;
}
  
export interface SearchActionModel<Tvalue> {
  type: SearchActions;
  payload: Tvalue;
}

export enum SearchActions {
  newSearchTerm = 'newSearchTerm'
}

export function getSearchReducer(users: Array<User>): Reducer<SearchReducerState, SearchActionModel<string>> {
  return function (_: SearchReducerState, action: SearchActionModel<string>): SearchReducerState {
    switch (action.type) {
      case SearchActions.newSearchTerm:
        const filteredUsers = action.payload 
          ? users.filter(user => user.name.toLowerCase().includes(action.payload)) 
          : [];

          return {filteredUsers, searchTerm: action.payload};
      default: 
          throw new Error();
    }
  }
}