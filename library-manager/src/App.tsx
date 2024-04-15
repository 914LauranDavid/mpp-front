import "./App.css";
import "./components/cats/AllCats";
import AllCats from "./components/cats/AllCats";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCat from "./components/cats/AddCat";
import CatDetails from "./components/cats/CatDetails";
import NavigationBar from "./components/NavigationBar";
import AgeDistribution from "./components/cats/AgeDistribution";
import NetworkStatus from "./components/NetworkStatus";
import { useCatStore } from "./stores/CatStore";
import ServerStatus from "./components/ServerStatus";
import { initializeWebSocket } from "./sockets/ServerWebSocket";


function App() {
  initializeWebSocket();
  
  return (
    <BrowserRouter>
      <NetworkStatus />
      {/* {isServerDown && <div>Server is down</div>} */}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;