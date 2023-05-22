import React, { useState } from "react";
import axios from "../../../services/axiosInterceptor";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";
import { FaHome } from "react-icons/fa";
export const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (input?.password.length < 6) {
      alert("Mật khẩu phải nhiều hơn 6 kí tự");
    } else {
      try {
        const response = await axios.post("api/auth/users/register", input);
        if (response.status === 201) {
          alert(response.data.message);
          navigate("/login");
        }
      } catch (error) {
        alert(error.response.data.message);
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
        <form
          className={styles.registerEmailPassword}
          onSubmit={handleRegister}
        >
          <div className={styles.registerEmail}>
            <p>Tên của bạn:</p>
            <input
              placeholder="Enter Your Name"
              type="text"
              className={styles.registerInput}
              name="name"
              value={input.name}
              onChange={(e) =>
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                })
              }
              required
            />
          </div>
          <div className={styles.registerPassword}>
            <p>Địa chỉ email:</p>
            <input
              placeholder="Enter Valid Email Address"
              type="email"
              name="email"
              value={input.email}
              onChange={(e) =>
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                })
              }
              className={styles.registerInput}
              required
            />
            <input
              className={styles.registerInput}
              placeholder="Enter Password"
              type="password"
              name="password"
              value={input.password}
              onChange={(e) =>
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                })
              }
              required
            />
          </div>
          <button className={styles.registerButton}>Đăng ký</button>
          <p>
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
