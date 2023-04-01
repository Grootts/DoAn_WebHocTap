import styles from "./AccountInfor.module.css";
const AccountInfo = () => {
  const dataLocal=localStorage.getItem('name',1)
  return (
    <div className={styles.accountInfo}>
      <p>Xin chào, {dataLocal}</p>
      <img />
    </div>
  );
};
export default AccountInfo;
