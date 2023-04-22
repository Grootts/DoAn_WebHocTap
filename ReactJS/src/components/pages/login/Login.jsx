import React, { useEffect, useState } from "react";
import axios from "../../../services/axiosInterceptor";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import { FaHome } from "react-icons/fa";
import Router from "../../../router/Router";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../redux/slide/userSlide";
import { useMutationHooks } from "../../../hook/useMutationHook";
import * as UserServices from "../../../services/UserServices";
export const Login = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const mutation = useMutationHooks((data) => UserServices.loginUser(data));
  const { data, isLoading, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess) {
      if (data.role === "admin" || data.role === "teacher") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      dispatch(
        updateUser({
          name: data?.name,
          email: data?.email,
          _id: data?.id,
          isRole: data?.role,
        })
      );
      localStorage.setItem("token", data?.token);
      localStorage.setItem("name", data?.name);
    }
  }, [isSuccess]);
  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate(input);
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
