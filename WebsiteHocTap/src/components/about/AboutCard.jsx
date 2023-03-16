import React from "react";
import Heading from "../common/heading/Heading";
import styles from "./AboutCard.module.css";
import { awrapper, homeAbout } from "../../dummydata";

const AboutCard = () => {
  return (
    <>
      <section>
        <div className={styles.aboutHome}>
          <Heading
            subtitle=""
            title="Lợi ích việc học Online trên website B&Đ"
          />
          <div>
            <div className={styles.items}>
              {homeAbout.map((val, id) => {
                return (
                  <div className={styles.aboutCard} key={id}>
                    <div className={styles.text}>
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutCard;
