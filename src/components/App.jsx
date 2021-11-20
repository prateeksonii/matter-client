import { Text } from "@chakra-ui/layout";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { privateApi } from "../api/api";
import { signedInUserUrl } from "../api/endpoints";
import UserContext from "../contexts/UserContext";
import IndexPage from "../pages";
import CreateOrganization from "../pages/createProfile/CreateOrganization";
import CreateProfile from "../pages/createProfile/CreateProfile";
import Dashboard from "../pages/dashboard/Dashboard";
import SignIn from "../pages/SignIn";
import Signup from "../pages/SignUp";

const App = () => {
  const [state, dispatch] = useContext(UserContext);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery(
    "getUser",
    async () => {
      const res = await privateApi.get(signedInUserUrl);

      if (res.data.user) {
        dispatch({ type: "SET_USER", payload: res.data.user });
      }

      return res.data.user;
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <Text>Loading....</Text>;

  if (error) return <Text>Error</Text>;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={!user ? <Outlet /> : <Navigate to='/dashboard' />}
          >
            <Route index element={<IndexPage />} />
            <Route path='signin' element={<SignIn refetch={refetch} />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route
            path='/dashboard'
            element={
              user ? (
                user.profile ? (
                  <Dashboard />
                ) : (
                  <Navigate to='/create-profile' replace />
                )
              ) : (
                <Navigate to='/signin' />
              )
            }
          />
          <Route
            path='/create-profile'
            element={
              user ? (
                user.profile ? (
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
            <Route path='organization' element={<CreateOrganization />} />
          </Route>
          {/* <PublicRoute user={user} path='/signup' element={<SignUp />} /> */}
          {/* <PrivateRoute user={user} path='/app' element={<Dashb />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
