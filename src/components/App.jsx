import { Text } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { privateApi } from "../api/api";
import { getOrganizationMemberUrl, signedInUserUrl } from "../api/endpoints";
import OrganizationContext from "../contexts/OrganizationContext";
import UserContext from "../contexts/UserContext";
import IndexPage from "../pages";
import CreateOrganization from "../pages/createProfile/CreateOrganization";
import CreateProfile from "../pages/createProfile/CreateProfile";
import CreateRoles from "../pages/createProfile/CreateRoles";
import Dashboard from "../pages/dashboard/Dashboard";
import SignIn from "../pages/SignIn";
import Signup from "../pages/SignUp";

const App = () => {
  const [, dispatch] = useContext(UserContext);
  const [, dispatchOrganization] = useContext(OrganizationContext);

  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await privateApi.get(signedInUserUrl);
      let isMember = false;

      console.log(res.data);

      if (res.data.user) {
        dispatch({ type: "SET_USER", payload: res.data.user });

        const res2 = await privateApi.get(getOrganizationMemberUrl);

        console.log(res2);

        if (res2.data.result.organizationMember) {
          isMember = true;
        }

        dispatchOrganization({
          type: "SET_ORGANIZATION",
          payload: res2.data.result.organizationMember,
        });
      }

      setUser({ ...res.data.user, isMember });
      setIsLoading(false);
    };

    if (refetch) {
      fetchData();
      setRefetch(false);
    }
  }, [refetch]);

  if (isLoading) return <Text>Loading....</Text>;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={!user ? <Outlet /> : <Navigate to='/dashboard' />}
          >
            <Route index element={<IndexPage />} />
            <Route path='signin' element={<SignIn setRefetch={setRefetch} />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route
            path='/dashboard'
            element={
              user ? (
                user.isMember ? (
                  <Dashboard />
                ) : (
                  <Navigate to='/profile' replace />
                )
              ) : (
                <Navigate to='/signin' />
              )
            }
          />
          <Route
            path='/profile'
            element={
              user ? (
                user.isMember ? (
                  <Navigate to='/dashboard' replace />
                ) : (
                  <Outlet />
                )
              ) : (
                <Navigate to='/signin' />
              )
            }
          >
            <Route index element={<CreateProfile />} />
            <Route
              path='organization'
              element={<CreateOrganization setRefetch={setRefetch} />}
            />
            <Route path='roles' element={<CreateRoles />} />
          </Route>
          {/* <PublicRoute user={user} path='/signup' element={<SignUp />} /> */}
          {/* <PrivateRoute user={user} path='/app' element={<Dashb />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
