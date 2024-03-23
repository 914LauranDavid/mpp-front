import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./ElementList";
import ElementList from "./ElementList";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import AddCat from "./AddCat";
import CatDetails from "./CatDetails";

// interface Cat {
//   id: number;
//   name: string;
//   age: number;
//   weight: number;
// }

// interface Cats extends Array<Cat> {}

function App() {
  const [allCats, setAllCats] = useState<any[]>([
    { id: 1, name: "Sofia", age: 2, weight: 2.3 },
    { id: 2, name: "Raymond", age: 5, weight: 3.8 },
  ]);

  return (
    <BrowserRouter>
      <ul>
        {/* <li>
          <Link to="/">Front Page</Link>
        </li> */}
        <li>
          <Link to="/cats">I wish to see the list of cats</Link>
        </li>
        <li>
          <Link to="/cat/add">Add cat</Link>
        </li>
      </ul>
      <Routes>
        {/* <Route path="/" element={} /> */}
        <Route
          path="/cats"
          element={<ElementList allCats={allCats} setAllCats={setAllCats} />}
        />
        <Route
          path="/cat/add"
          element={<AddCat allCats={allCats} setAllCats={setAllCats} />}
        />
        <Route
          path="/cats/:id"
          element={<CatDetails allCats={allCats} setAllCats={setAllCats} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
