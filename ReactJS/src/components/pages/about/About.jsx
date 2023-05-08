import React from "react";
import Title from "../../common/title/Title";
import AboutCard from "./AboutCard";
import TeacherPanel from "../../component/teacherPanel/TeacherPanel";
import styles from "./AboutCard.module.css";
import AllTeacherPanel from "../../component/teacherPanel/AllTeacherPanel";
const About = () => {
  return (
    <div>
      <Title title="Thông tin các giảng viên" />
      <div className={styles.teacherStyles}>
        <AllTeacherPanel />
      </div>
    </div>
  );
};

export default About;
