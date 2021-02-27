import { useContext } from "react";
import { UsersListContext } from "../contexts/users-list-context";

interface UsersListProps {
  fallback: JSX.Element;
}

export default function UsersList({fallback}: UsersListProps) {
  const [{filteredUsers, searchTerm}] = useContext(UsersListContext);

  return (
    <>
    {searchTerm && !filteredUsers.length && fallback}
      <ol>
        {filteredUsers.map(user =>  (
          <li key={user.id}>
            <span className="name">{user.name}</span>
            <span className="username">@{user.username}</span>
          </li>))}
      </ol>
    </>
  );
}

