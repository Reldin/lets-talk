import { Route, Routes } from "react-router-dom";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import FrontPage from "./Pages/FrontPage";
import NotFoundPage from "./Pages/NotFoundPage";

const App = () => {
  return (
    <div className="App">
      <Header link1="About us" link2="Sign Up" link3="Login" />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/signup" />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
