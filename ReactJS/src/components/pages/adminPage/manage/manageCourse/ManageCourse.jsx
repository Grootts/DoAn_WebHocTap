import { useEffect, useState } from "react";
import styles from "./ManageCourse.module.css";
import axios from "../../../../../services/axiosInterceptor";
import { Button, Modal } from "antd";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { getBase64 } from "../../../../../utils";
import { WrapperUploadFile } from "./Style";
import { Link, useNavigate } from "react-router-dom";

const ManageCourse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inittial = () => ({
    name: "",
    price: "",
    description: "",
    image: "",
    type: "",
    createdBy: "",
  });
  const [stateProduct, setStateProduct] = useState(inittial());
  const [coursesCard, setDataCourse] = useState([]);
  const navigate = useNavigate();
  const handleAddCourse = () => {
    setIsModalOpen(true);
  };
  const handleOk = async (e) => {
    try {
      const response = await axios.post("api/course/create", stateProduct);

      if (response.status === 200) {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  useEffect(() => {
    async function dataStudent() {
      const response = await axios.get("api/course/get-all");

      const data = response.data.data;
      setDataCourse(data);
    }
    dataStudent();
  }, []);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList?.[0];
    if (!file?.url && !file?.preview) {
      file.preview = await getBase64(file?.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
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
            <p>Tên lớp:</p>
            <input
              type="text"
              name="name"
              value={stateProduct.name}
              onChange={handleOnchange}
            />
          </div>
          <div className={styles.inputAdd}>
            <p>Giới thiệu:</p>
            <textarea type="" name="description" onChange={handleOnchange} />
          </div>
          <div className={styles.inputAdd}>
            <p>Loại:</p>
            <input
              type="text"
              name="type"
              value={stateProduct.type}
              onChange={handleOnchange}
            />
          </div>
          <div className={styles.inputAdd}>
            <p>Giá:</p>
            <input
              type="text"
              name="price"
              value={stateProduct.price}
              onChange={handleOnchange}
            />
          </div>
          <div className={styles.inputAdd}>
            <p>Giáo viên:</p>
            <input
              type="text"
              name="createdBy"
              value={stateProduct.createdBy}
              onChange={handleOnchange}
            />
          </div>
          <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
            <Button>Select File</Button>
            {stateProduct?.image && (
              <img
                src={stateProduct?.image}
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginLeft: "10px",
                }}
                alt="avatar"
              />
            )}
          </WrapperUploadFile>
        </form>
      </Modal>

      <p>Quản lý lớp học</p>
      <div className={styles.addCourse}>
        <div onClick={handleAddCourse}>Thêm mới</div>
      </div>
      <table>
        <thead className={styles.courseTitle}>
          <tr>
            <th>Tên Lớp</th>
            <th>Ảnh</th>
            <th>Tài liệu</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody className={styles.courseBody}>
          {coursesCard.map((data) => {
            return (
              <tr key={data._id}>
                <th>{data.name}</th>
                <th>
                  <img className={styles.img} src={data.image} alt="" />
                </th>
                <th>{data.type}</th>
                <th>{data.price}</th>
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
                  <div className={styles.addCourse}>
                    <Link to={`lesson/${data._id}`}> Quản lý bài học</Link>
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ManageCourse;
