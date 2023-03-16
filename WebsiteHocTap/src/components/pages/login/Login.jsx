import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
import { FaHome } from "react-icons/fa";
export const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8800/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
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
        <div className={styles.loginTitle}>Đăng nhập</div>
        <form className={styles.loginEmailPassword} onSubmit={handleSubmit}>
          <div className={styles.loginEmail}>
            <p>Tài khoản:</p>
            <input
              name="email"
              className={styles.loginInput}
              placeholder="Nhập email"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.loginPassword}>
            <p>Mật khẩu:</p>
            <input
              name="password"
              className={styles.loginInput}
              placeholder="Nhập mật khẩu"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className={styles.error_msg}>{error}</div>}
          <button className={styles.loginButton}>Đăng nhập</button>
          <p>
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </p>
          <p>Bạn quên mật khẩu ? <Link to='/forgotpassword'>Quên mật khẩu</Link></p>
        </form>
      </div>
    </div>
  );
};
