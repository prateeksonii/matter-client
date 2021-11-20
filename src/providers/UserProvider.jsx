import { useReducer } from "react";
import UserContext from "../contexts/UserContext";
import userReducer from "../reducers/userReducer";

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, {});

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
