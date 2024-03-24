import "./App.css";
import "./components/AllCats";
import AllCats from "./components/AllCats";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AddCat from "./components/AddCat";
import CatDetails from "./components/CatDetails";
import { startCatRepository } from "./repository/CatRepository";


function App() {
  const { getAllCats, getCatById, addCat, deleteCat, updateCat } = startCatRepository();

  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/cats">All cats</Link>
        </li>
        <li>
          <Link to="/cat/add">Add a new cat</Link>
        </li>
      </ul>
      <Routes>
        <Route
          path="/cats"
          element={<AllCats getAllCats={getAllCats} deleteCat={deleteCat} />}
        />
        <Route
          path="/cat/add"
          element={<AddCat getAllCats={getAllCats} addCat={addCat} />}
        />
        <Route
          path="/cats/:id"
          element={<CatDetails getCatById={getCatById} updateCat={updateCat} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;