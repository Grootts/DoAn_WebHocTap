import React from "react";
import Search from "../search/Search";

import CoursesCard from "./CoursesCard";
import OnlineCourses from "./OnlineCourses";

const CourseHome = () => {
  return (
    <>
      <Search />
      <CoursesCard />
      <OnlineCourses />
    </>
  );
};

export default CourseHome;
