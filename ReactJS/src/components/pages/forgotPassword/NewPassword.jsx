import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../../../services/axiosInterceptor";
import styles from "./NewPassword.module.css";
import { FaHome } from "react-icons/fa";

export const NewPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      input?.newPassword === input?.confirmPassword &&
      input?.confirmPassword.length > 6
    ) {
      const res = await axios.post(
        `/api/auth/forget-password/${id}/${token}`,
        input
      );
      if (res.status === 200) {
        alert("password changed Successfully");
        navigate("/login");
      }
    }
    if (input?.newPassword !== input?.confirmPassword) {
      alert("Mật khẩu không giống nhau");
    }
    if (input?.confirmPassword.length < 6) {
      alert("Mật khẩu phải lớn hơn 6 kí tự");
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
        <div className={styles.registerTitle}>Tạo mật khẩu mới</div>
        <form className={styles.registerEmailPassword} onSubmit={handleSubmit}>
          <input
            type="password"
            id=""
            placeholder="Enter New Password"
            name="newPassword"
            value={input.newPassword}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
            required
          />
          <br />
          <input
            type="password"
            id=""
            placeholder="Enter Confirm Password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
            required
          />
          <br />
          <button>Xác nhận</button>
        </form>
      </div>
    </div>
  );
};
