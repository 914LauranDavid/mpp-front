import "./App.css";
import "./components/cats/AllCats";
import AllCats from "./components/cats/AllCats";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCat from "./components/cats/AddCat";
import CatDetails from "./components/cats/CatDetails";
import NavigationBar from "./components/NavigationBar";
import AgeDistribution from "./components/cats/AgeDistribution";
import NetworkStatus from "./components/NetworkStatus";
import ServerStatus from "./components/ServerStatus";
import { initializeWebSocket } from "./sockets/ServerWebSocket";
import ToysPerCat from "./components/ToysPerCat";
import { Auth0Provider } from '@auth0/auth0-react';
import LoginButton from "./components/authentication/LoginButton";
import LogoutButton from "./components/authentication/LogoutButton";
import UserProfile from "./components/UserProfile";
import AllUsers from "./components/users/AllUsers";


function App() {
  initializeWebSocket();
  // const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <Auth0Provider
      domain="dev-71pxajof3gt25bcw.us.auth0.com"
      clientId="jol7BLKMPCGrdq30jO1iiDrqqe2K4XFG"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <BrowserRouter>
        <NetworkStatus />
        <ServerStatus />
        <NavigationBar />
        <Routes>
          <Route
            path="/cats"
            element={<AllCats />}
          />
          <Route
            path="/cat/add"
            element={<AddCat />}
          />
          <Route
            path="/cats/:id"
            element={<CatDetails />}
          />
          <Route
            path="/cat/age_distribution"
            element={<AgeDistribution />}
          />
          <Route
            path="/cat/toys_per_cat"
            element={<ToysPerCat />}
          />
          <Route
            path="/profile"
            element={<UserProfile />}
          />
          <Route
            path="/users"
            element={<AllUsers />}
          />
        </Routes>
      </BrowserRouter>

      <LoginButton />
      <LogoutButton />
    </Auth0Provider>
  );
}

export default App;