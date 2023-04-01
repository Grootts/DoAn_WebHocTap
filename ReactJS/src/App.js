import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/pages/login/Login";
import { Register } from "./components/pages/register/Register";
import EmailVerify from "./components/pages/email/EmailVerify";
import { ForgotPassword } from "./components/pages/forgotPassword/ForgotPassword";
import { NewPassword } from "./components/pages/forgotPassword/NewPassword";
import CourseHome from "./components/pages/allcourses/CourseHome";
import About from "./components/pages/about/About";
import Home from "./components/pages/home/Home";
import Contact from "./components/pages/contact/Contact";
import Welcome from "./components/pages/home/Welcome";
import Search from "./components/component/search/Search";
import AdminHome from "./components/pages/adminPage/AdminHome";
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
        <Route path="/api/user/verifyemail/:token" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/user/reset/:id/:token" element={<NewPassword />} />
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
    </>
  );
}

export default App;
