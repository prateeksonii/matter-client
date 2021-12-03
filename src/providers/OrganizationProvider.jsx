import { useReducer } from "react";
import OrganizationContext from "../contexts/OrganizationContext";
import organizationReducer from "../reducers/organizationReducer";

const OrganizationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(organizationReducer, {});

  return (
    <OrganizationContext.Provider value={[state, dispatch]}>
      {children}
    </OrganizationContext.Provider>
  );
};

export default OrganizationProvider;
