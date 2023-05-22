import { useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./EmailVerify.module.css";
import axios from "../../../services/axiosInterceptor";
const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const { token } = useParams();

  const handleClickVerify = () => {
    const verifyEmailUrl = async () => {
      try {
        const { data } = await axios.get(`api/user/verifyemail/${token}`);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
        console.log(token);
      }
    };
    verifyEmailUrl();
  };

  return (
    <Fragment>
      <button onClick={handleClickVerify}>Xác thực email</button>
      {validUrl ? (
        <div className={styles.container}>
          <h1>Email verified successfully</h1>
          <Link to="/login">
            <button className={styles.green_btn}>Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default EmailVerify;
