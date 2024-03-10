import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./ElementList";
import ElementList from "./ElementList";

function App() {
  const [count, setCount] = useState(0);
  return <ElementList />;
}

export default App;
