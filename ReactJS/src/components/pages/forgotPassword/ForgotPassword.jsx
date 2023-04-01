import React, { useState } from "react";
import axios from "../../../services/axiosInterceptor";
import styles from "./ForgotPassword.module.css";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
export const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/auth/forget-password", { email });

    if (res) {
      alert("email Sent");
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
              type="email"
              id=""
              placeholder="Enter Email"
              name="newPassword"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className={styles.loginButton}>Gửi email</button>
        </form>
      </div>
    </div>
  );
};
