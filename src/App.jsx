import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./containers/Login";
import Home from "./containers/Home";
import NewQuote from "./containers/NewQuote";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewQuote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
