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
import { useState } from "react";
import Screensaver from "./components/Screensaver";
import MyCats from "./components/cats/MyCats";
import OwnedCatDetails from "./components/cats/OwnedCatDetails";
import CutenessLeaderboard from "./components/cats/CutenessLeaderboard";

function App() {
  initializeWebSocket();
  const [isScreensaver, setIsScreensaver] = useState(false);

  const handleScreensaverToggle = () => {
    setIsScreensaver(prevState => !prevState);
  };

  return (
    <Auth0Provider
      domain="dev-71pxajof3gt25bcw.us.auth0.com"
      clientId="jol7BLKMPCGrdq30jO1iiDrqqe2K4XFG"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <BrowserRouter>
        {isScreensaver ? (
          <Screensaver onExit={handleScreensaverToggle} />
        ) : (
          <>
            <NetworkStatus />
            <ServerStatus />
            <NavigationBar onToggleScreensaver={handleScreensaverToggle} />
            <Routes>
              <Route path="/cats" element={<AllCats />} />
              <Route path="/cat/add" element={<AddCat />} />
              <Route path="/cats/:id" element={<CatDetails />} />
              <Route path="/cat/age_distribution" element={<AgeDistribution />} />
              <Route path="/cat/toys_per_cat" element={<ToysPerCat />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/users" element={<AllUsers />} />
              <Route path="/my-cats" element={<MyCats />} />
              <Route path="/my-cats/:id" element={<OwnedCatDetails />} />
              <Route path="/leaderboard" element={<CutenessLeaderboard />} />
            </Routes>
            <br />
            <LoginButton />
            <LogoutButton />
          </>
        )}
      </BrowserRouter>
    </Auth0Provider>
  );
}

export default App;
