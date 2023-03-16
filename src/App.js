import "./App.css";
import Signup from "./components/signup/signup";
import { Routes, Route } from "react-router-dom";
import LoginComponent from "./components/login/login";
import { useSelector } from "react-redux";
import Home from "./components/home/home";
import Menu from "./components/menu/menu";

function App() {
  const selector = useSelector((state) => state.csmuser);

  return (
    <div>
      <Routes>
        <Route path="/restaurant/menu/:restaurantid" element={<Menu />} />
        {selector.email === "" ||
          selector.name === "" ||
          selector.restaurantName === "" ? (
          <>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<LoginComponent />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
