import { useEffect, useState } from "react";
import styles from "./ManageTeacher.module.css";
import axios from "../../../../../services/axiosInterceptor";
import { Modal } from "antd";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

const ManageTeacher = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coursesCard, setDataCourse] = useState([]);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleAddCourse = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    async function dataTeacher() {
      const response = await axios.get("api/user/get-all");

      const data =
        response.data.data.filter((element) =>
          element.role.includes("teacher")
        ) ?? [];
      setDataCourse(data);
    }
    dataTeacher();
  }, []);
  const handleOk = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "api/auth/teachers/register",
        stateProduct
      );
      if (response.status === 201) {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
    console.log(stateProduct);
  };
  const handleUpdate = () => {};
  const handleDelete = () => {};
  return (
    <div className={styles.manageCourseTable}>
      <Modal
        title="Thêm lớp"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
          <div className={styles.inputAdd}>
            <p>Tên của bạn:</p>
            <input
              placeholder="Enter Your Name"
              type="text"
              name="name"
              value={stateProduct.name}
              onChange={handleOnchange}
              required
            />
          </div>
          <div className={styles.inputAdd}>
            <p>Địa chỉ email:</p>
            <input
              placeholder="Enter Valid Email Address"
              type="email"
              name="email"
              value={stateProduct.email}
              onChange={handleOnchange}
            />
          </div>
          <div className={styles.inputAdd}>
            <p>Mật khẩu:</p>
            <input
              placeholder="Enter Password"
              type="password"
              name="password"
              value={stateProduct.password}
              onChange={handleOnchange}
            />
          </div>
        </form>
      </Modal>

      <p>Quản lý giáo viên</p>
      <div className={styles.addCourse}>
        <div onClick={handleAddCourse}>Thêm mới</div>
      </div>
      <table>
        <thead className={styles.courseTitle}>
          <tr>
            <th>Tên giáo viên</th>
            <th>Email</th>
            <th>Xác thực</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody className={styles.courseBody}>
          {coursesCard.map((data) => {
            return (
              <tr>
                <th>{data.name}</th>
                <th>{data.email}</th>
                <th>
                  {data.isVerified === true ? "Đã xác thực" : "chưa xác thực"}
                </th>
                <th>{data.role}</th>
                <th>
                  <MdDelete
                    size={25}
                    className={styles.deleteIcon}
                    onClick={handleDelete}
                  />{" "}
                  <GrUpdate
                    size={20}
                    className={styles.updateIcon}
                    onClick={handleUpdate}
                  />
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ManageTeacher;
