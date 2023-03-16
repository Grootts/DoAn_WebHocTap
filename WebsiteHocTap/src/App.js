import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import Search from "./components/search/Search";
import Menu from "./components/common/header/Menu";
import Head from "./components/common/header/Head";
import Welcome from "./components/home/Welcome";
import { Login } from "./components/pages/login/Login";
import { Register } from "./components/pages/register/Register";
import EmailVerify from "./components/pages/email/EmailVerify";
import { ForgotPassword } from "./components/pages/forgotPassword/ForgotPassword";
import { NewPassword } from "./components/pages/forgotPassword/NewPassword";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<CourseHome />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<NewPassword />} />
      </Routes>
    </>
  );
}

export default App;
