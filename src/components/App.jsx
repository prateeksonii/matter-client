import { Text } from "@chakra-ui/layout";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { privateApi } from "../api/api";
import { signedInUserUrl } from "../api/endpoints";
import UserContext from "../contexts/UserContext";
import IndexPage from "../pages";
import CreateProfile from "../pages/CreateProfile";
import Dashboard from "../pages/dashboard/Dashboard";
import SignIn from "../pages/SignIn";
import Signup from "../pages/SignUp";

const App = () => {
  const [, dispatch] = useContext(UserContext);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery("getUser", async () => {
    const res = await privateApi.get(signedInUserUrl);

    if (res.data.user) {
      dispatch({ type: "SET_USER", payload: res.data.user });
    }

    return res.data.user;
  });

  if (isLoading) return <Text>Loading....</Text>;

  if (error) return <Text>Error</Text>;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={!user ? <IndexPage /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/signin'
            element={!user ? <SignIn /> : <Navigate to='/dashboard' />}
          />
          <Route
            path='/signup'
            element={!user ? <Signup /> : <Navigate to='/dashboard' />}
          />
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
                  <CreateProfile />
                )
              ) : (
                <Navigate to='/signin' />
              )
            }
          />
          {/* <PublicRoute user={user} path='/signup' element={<SignUp />} /> */}
          {/* <PrivateRoute user={user} path='/app' element={<Dashb />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
