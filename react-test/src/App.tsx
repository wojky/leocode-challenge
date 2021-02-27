import React, { useState, useEffect, useReducer } from 'react';
import { API_URL } from './config/constants';
import { User } from './models/user.model';
import Search from './Search/Search'
import { getSearchReducer } from './Search/search.reducer';
import UsersList from './UsersList/UsersList';
import Loader from './Loader/Loader';
import './App.css';
import { UsersListContext } from './contexts/users-list-context';

function App() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [state, dispatch] = useReducer(getSearchReducer(users), {filteredUsers: [], searchTerm: ''});

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(setUsers)
  }, [])

  return (
    <React.StrictMode>
      <UsersListContext.Provider value={[state, dispatch]}>
        <Loader condition={!!users.length}>
          <div className="App">
            <div>
              <h4>Users list</h4>
              <Search />
            </div>
            <UsersList fallback={<p>Brak wyników wyszukwiania</p>} />
          </div>
        </Loader>
      </UsersListContext.Provider>
    </React.StrictMode>
  );
}

export default App;
