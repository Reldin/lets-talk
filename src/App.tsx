import { Route, Routes } from "react-router-dom";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Categories from "./Pages/Categories/Categories";
import FrontPage from "./Pages/FrontPage";
import Login from "./Pages/Login/Login";
import NotFoundPage from "./Pages/NotFoundPage";
import Signup from "./Pages/Signup/Signup";

const App = () => {
  return (
    <div className="App">
      <Header home="home" link1="Categories" link2="SignUp" link3="Login" />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
