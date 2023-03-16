import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./NewPassword.module.css";
import { FaHome } from "react-icons/fa";
import axios from "axios";
export const NewPassword = () => {
  const param = useParams();
  const [data, setData] = useState({ password: "" });
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };

  const handleClick = () => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:8800/api/password-reset/${param.id}/${param.token}`;
        const { data } = await axios.post(url, data);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    verifyEmailUrl();
  };

  return (
    <div className={styles.registerBackground}>
      <div className={styles.registerPanel}>
        <p className={styles.registerBack}>
          <Link to="/">
            <FaHome size={30} />
          </Link>
        </p>
        <div className={styles.registerTitle}>Tạo mật khẩu mới</div>
        <form className={styles.registerEmailPassword} onSubmit={handleClick}>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
            value={data.password}
          />
          <br />
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="confirm-password"
          />
          <br />
          <button>Ok</button>
        </form>
      </div>
    </div>
  );
};
