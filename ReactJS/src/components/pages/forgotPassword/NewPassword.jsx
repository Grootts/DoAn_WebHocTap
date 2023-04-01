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

    const res = await axios.post(
      `/api/auth/forget-password/${id}/${token}`,
      input
    );
    if (res.status === 200) {
      alert("password changed Successfully");
      navigate("/login");
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
          />
          <br />
          <input
            type="password"
            id=""
            placeholder="Enter Confirm Email"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
          />
          <br />
          <button>Ok</button>
        </form>
      </div>
    </div>
  );
};
