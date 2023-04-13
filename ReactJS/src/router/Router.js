import { Routes, Route } from "react-router-dom";
import { Login } from "../components/pages/login/Login";
import { Register } from "../components/pages/register/Register";
import EmailVerify from "../components/pages/email/EmailVerify";
import { ForgotPassword } from "../components/pages/forgotPassword/ForgotPassword";
import { NewPassword } from "../components/pages/forgotPassword/NewPassword";
import CourseHome from "../components/pages/allcourses/CourseHome";
import About from "../components/pages/about/About";
import Home from "../components/pages/home/Home";
import Contact from "../components/pages/contact/Contact";
import Welcome from "../components/pages/home/Welcome";
import Search from "../components/component/search/Search";
import AdminHome from "../components/pages/adminPage/AdminHome";
import CourseDetail from "../components/pages/allcourses/CourseDetail";
import StatisticalHome from "../components/pages/adminPage/statistical/StatisticalHome";
import ManageStudent from "../components/pages/adminPage/manage/manageStudent/ManageStudent";
import ManageTeacher from "../components/pages/adminPage/manage/manageTeacher/ManageTeacher";
import ManageCourse from "../components/pages/adminPage/manage/manageCourse/ManageCourse";
import ManageStatistical from "../components/pages/adminPage/manage/manageStatistical/ManageStatistical";
import ProfilePage from "../components/component/profilePage/ProfilePage";
import Introduce from "../components/pages/allcourses/Introduce";
import Lesson from "../components/pages/allcourses/lesson/Lesson";
import OrderPage from "../components/pages/orderPage/OrderPage";
const Router = () => {
  const data = localStorage.getItem("role", 1);
  console.log(data);
  const publicRouter = () => (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Welcome />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<CourseHome />} />
        <Route path="contact" element={<Contact />} />
        <Route path="courseDetail/:id" element={<CourseDetail />}>
          <Route index element={<Introduce />} />
          <Route path="lesson" element={<Lesson />} />
        </Route>
        <Route path="order" element={<OrderPage />} />
        <Route path="search" element={<Search />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/api/user/verifyemail/:token" element={<EmailVerify />} />
      <Route path="/reset-password" element={<ForgotPassword />} />
      <Route path="/user/reset/:id/:token" element={<NewPassword />} />
    </Routes>
  );
  const privateRouter = () => (
    <Routes>
      <Route path="/admin" element={<AdminHome />}>
        <Route path="/admin" element={<StatisticalHome />} />
        <Route path="manage-student" element={<ManageStudent />} />
        <Route path="manage-teacher" element={<ManageTeacher />} />
        <Route path="manage-course" element={<ManageCourse />} />
        <Route path="manage-statistical" element={<ManageStatistical />} />
      </Route>
    </Routes>
  );
  return (
    <div>
      {(data === "student" || "null") && publicRouter()}
      {(data === "admin" || "teacher") && privateRouter()}
    </div>
  );
};

export default Router;
