import React, { useEffect, useState } from "react";
import axios from "../../../services/axiosInterceptor";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import { FaHome } from "react-icons/fa";
import Router from "../../../router/Router";
export const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/auth/users/login", input);
      const checkRole = response.data.role;

      if (response.status === 200) {
        alert(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);

        localStorage.setItem("role", response.data.role);

        console.log(checkRole);
        if (checkRole === "admin" || checkRole === "teacher") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      alert(error.response.data.message);
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
        <form className={styles.loginEmailPassword} onSubmit={handleLogin}>
          <div className={styles.loginEmail}>
            <p>Tài khoản:</p>
            <input
              className={styles.loginInput}
              type="email"
              id=""
              placeholder="Enter Email"
              name="email"
              value={input.email}
              onChange={(e) =>
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                })
              }
              required
            />
          </div>
          <div className={styles.loginPassword}>
            <p>Mật khẩu:</p>
            <input
              className={styles.loginInput}
              placeholder="Enter Password"
              type="password"
              id="form2Example27"
              name="password"
              value={input.password}
              onChange={(e) =>
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <button className={styles.loginButton}>Đăng nhập</button>
          <p>
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </p>
          <p>
            Bạn quên mật khẩu ? <Link to="/reset-password">Quên mật khẩu</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
