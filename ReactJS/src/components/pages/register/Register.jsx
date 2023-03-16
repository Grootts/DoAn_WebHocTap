import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css";
import { FaHome } from "react-icons/fa";
import axios from "axios";
export const Register = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8800/api/users";
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
    <div className={styles.registerBackground}>
      <div className={styles.registerPanel}>
        <p className={styles.registerBack}>
          <Link to="/">
            <FaHome size={30} />
          </Link>
        </p>
        <div className={styles.registerTitle}>Đăng ký</div>
        <form className={styles.registerEmailPassword} onSubmit={handleSubmit}>
          <div className={styles.registerEmail}>
            <p>Tên của bạn:</p>
            <input
              name="firstName"
              type="text"
              className={styles.registerInput}
              placeholder="Nhập họ"
              value={data.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              type="text"
              className={styles.registerInput}
              placeholder="Nhập tên"
              value={data.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.registerPassword}>
            <p>Địa chỉ email:</p>
            <input
              name="email"
              type="email"
              className={styles.registerInput}
              placeholder="Địa chỉ email"
              value={data.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              className={styles.registerInput}
              placeholder="Mật khẩu"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          {error && <div className={styles.error_msg}>{error}</div>}
          {msg && <div className={styles.success_msg}>{msg}</div>}
          <button className={styles.registerButton}>Đăng ký</button>
          <p>
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
