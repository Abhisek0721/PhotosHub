import "bootstrap/dist/css/bootstrap.min.css";
import "./css/common.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BasePage from "./pages/BasePage";
import Search from "./pages/Search";

function App():JSX.Element {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<BasePage />}>
          <Route index element={<Home />} />
          <Route
            path="search"
            element={<Search />}
          />
          
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
