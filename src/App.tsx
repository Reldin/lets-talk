import { Route, Routes } from "react-router-dom";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Categories from "./Pages/Categories/Categories";
import Category from "./Pages/Categories/Category/Category";
import FrontPage from "./Pages/FrontPage";
import Login from "./Pages/Login/Login";
import NotFoundPage from "./Pages/NotFoundPage";
import Signup from "./Pages/Signup/Signup";

const App = () => {
  return (
    <div className="App">
      <Header home="home" link1="Categories" link2="Sign Up" link3="Log in" />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<Category />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
