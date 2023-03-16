import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./ForgotPassword.module.css";
import { FaHome } from "react-icons/fa";
export const ForgotPassword = () => {
  const [data, setData] = useState({ email: "" });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8800/api/password-reset";
      const { data: res } = await axios.post(url, data);
      setMsg(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.loginBackground}>
      <div className={styles.loginPanel}>
        <p className={styles.loginBack}>
          <Link to="/">
            <FaHome size={30} />
          </Link>
        </p>
        <div className={styles.loginTitle}>Quên mật khẩu</div>
        <form className={styles.loginEmailPassword} onSubmit={handleSubmit}>
          <div className={styles.loginEmail}>
            <p>Email đăng ký:</p>
            <input
              name="email"
              className={styles.loginInput}
              placeholder="Nhập email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className={styles.error_msg}>{error}</div>}
          {msg && <div className={styles.success_msg}>{msg}</div>}
          <button className={styles.loginButton}>Gửi email</button>
        </form>
      </div>
    </div>
  );
};
