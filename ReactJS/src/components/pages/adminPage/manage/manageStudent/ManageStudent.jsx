import { useEffect, useState } from "react";
import styles from "./ManageStudent.module.css";
import axios from "../../../../../services/axiosInterceptor";
import { Modal } from "antd";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { Drawer } from "antd";
import { useMutationHooks } from "../../../../../hook/useMutationHook";
import * as UserServices from "../../../../../services/UserServices";
import Loading from "../../../../component/loading/Loading";
const ManageStudent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coursesCard, setDataCourse] = useState([]);
  const [update, setUpdate] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [stateProductDetail, setStateProductDetail] = useState({
    name: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const handleAddCourse = () => {
    setIsModalOpen(true);
  };
  const mutation = useMutationHooks((data) => UserServices.getAllUser());
  const { data, isSuccess, isLoading } = mutation;
  useEffect(() => {
    mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  useEffect(() => {
    if (isSuccess) {
      const dataAllStudent =
        data?.data.filter((element) => element.role.includes("student")) ?? [];
      setDataCourse(dataAllStudent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  const handleOk = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "api/auth/users/register",
        stateProduct
      );
      if (response.status === 201) {
        alert("Thêm thành công");
        setUpdate(!update);
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
  const handleOnchangeDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      [e.target.name]: e.target.value,
    });
    console.log(stateProductDetail);
  };
  const handleUpdate = async (id) => {
    setOpen(true);
    try {
      const response = await axios.get(`api/user/get-details/${id}`);
      setStateProductDetail(response.data.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`api/user/delete-user/${id}`);

      if (response.status === 200) {
        alert(response.data.message);
        setUpdate(!update);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const handleSubmitUpdate = async (id) => {
    console.log(id);

    try {
      const response = await axios.put(
        `api/user/update-user/${id}`,
        stateProductDetail
      );

      if (response.status === 200) {
        alert("cập nhật thành công");
        setUpdate(!update);
        return setOpen(false);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className={styles.manageCourseTable}>
      <Loading isLoading={isLoading}></Loading>
      <Modal
        title="Thêm học sinh"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
          <div className={styles.inputAdd}>
            <p>Tên của bạn:</p>
            <input
              placeholder="Nhập tên"
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
              placeholder="Nhập email muốn đăng kí"
              type="email"
              name="email"
              value={stateProduct.email}
              onChange={handleOnchange}
            />
          </div>
          <div className={styles.inputAdd}>
            <p>Mật khẩu:</p>
            <input
              placeholder="Nhập mật khẩu"
              type="password"
              name="password"
              value={stateProduct.password}
              onChange={handleOnchange}
            />
          </div>
        </form>
      </Modal>

      <p>Quản lý học sinh</p>
      {open && (
        <Drawer
          title="Update"
          placement="right"
          onClose={onClose}
          open={open}
          closable={false}
          width="450px"
        >
          <form style={{ marginTop: "60px" }}>
            <div className={styles.inputAdd}>
              <p>Tên của bạn:</p>
              <input
                placeholder="Nhập tên muốn thay đổi"
                type="text"
                name="name"
                value={stateProductDetail.name}
                onChange={handleOnchangeDetail}
                required
              />
            </div>
            <div className={styles.inputAdd}>
              <p>Địa chỉ email:</p>
              <p>{stateProductDetail.email}</p>
            </div>
            <div className={styles.inputAdd}>
              <p>Mật khẩu:</p>
              <input
                placeholder="Nhập mật khẩu muốn thay đổi"
                type="password"
                name="password"
                onChange={handleOnchangeDetail}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <div
                className={styles.addCourse}
                onClick={() => handleSubmitUpdate(stateProductDetail._id)}
              >
                Cập nhật
              </div>
            </div>
          </form>
        </Drawer>
      )}
      <div className={styles.addCourse}>
        <div onClick={handleAddCourse}>Thêm mới</div>
      </div>
      <table>
        <thead className={styles.courseTitle}>
          <tr>
            <th>Tên học sinh</th>
            <th>Email</th>
            <th>Xác thực</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody className={styles.courseBody}>
          {coursesCard?.map((data) => {
            return (
              <tr key={data._id}>
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
                    onClick={() => handleDelete(data._id)}
                  />{" "}
                  <GrUpdate
                    size={20}
                    className={styles.updateIcon}
                    onClick={() => handleUpdate(data._id)}
                  />
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Loading isLoading={isLoading} />
    </div>
  );
};
export default ManageStudent;
