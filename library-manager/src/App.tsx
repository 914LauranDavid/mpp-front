import "./App.css";
import "./components/AllCats";
import AllCats from "./components/AllCats";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCat from "./components/AddCat";
import CatDetails from "./components/CatDetails";
import { startCatRepository } from "./repository/CatRepository";
import NavigationBar from "./components/NavigationBar";
import AgeDistribution from "./components/AgeDistribution";


function App() {
  // const { getAllCats, getCatById, addCat, deleteCat, updateCat, setAll } = startCatRepository();

  return (
    <BrowserRouter>
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