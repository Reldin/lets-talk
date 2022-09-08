import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { IReduxStates } from "./helper/interfaces";
import { useAppDispatch } from "./hooks";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Categories from "./Pages/Categories/Categories";
import Category from "./Pages/Categories/Category/Category";
import FrontPage from "./Pages/FrontPage";
import Login from "./Pages/Login/Login";
import NotFoundPage from "./Pages/NotFoundPage";
import Signup from "./Pages/Signup/Signup";
import { authActions, userLogout } from "./store/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const redux = useSelector((state: IReduxStates) => state);

  useEffect(() => {
    const token: string | null = localStorage.getItem("authToken");
    if (token) {
      const decodedToken: { username: string; iat: number; exp: number } =
        jwtDecode(token);
      dispatch(authActions.setUsername(decodedToken.username));
    }
  }, [dispatch]);

  const handleLogout = () => {
    appDispatch(userLogout())
      .unwrap()
      .then((response) => console.log("Logged out"))
      .catch((error) => console.log("failed to log out"));
  };

  return (
    <div className="App">
      <Header
        home="Home"
        link1="Categories"
        link2="SignUp"
        link3="Login"
        isAuth={redux.auth.isAuthenticated}
        logout={handleLogout}
      />
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
