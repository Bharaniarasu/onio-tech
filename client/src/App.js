import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/main";
import Routers from "./routers";

function App() {
  return (
    <BrowserRouter>
      <Main>
        <Routers />
      </Main>
    </BrowserRouter>
  );
}

export default App;
