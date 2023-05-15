import { useEffect, useState } from "react";
import styles from "./ManageCourse.module.css";
import axios from "../../../../../services/axiosInterceptor";
import { Button, Drawer, Modal } from "antd";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { getBase64 } from "../../../../../utils";
import { WrapperUploadFile } from "./Style";
import { Link, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../../../../hook/useMutationHook";
import * as CourseServices from "../../../../../services/CourseServices";
import { useSelector } from "react-redux";
const ManageCourse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenListStudent, setIsModalOpenListStudent] = useState(false);

  const user = useSelector((state) => state.user);
  const inittial = () => ({
    name: "",
    price: "",
    description: "",
    image: "",
    type: "",
    createdBy: user?.id,
  });
  const [stateProduct, setStateProduct] = useState(inittial());
  const [stateProductDetail, setStateProductDetail] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    type: "",
    createdBy: user?.id,
  });
  const [coursesCard, setDataCourse] = useState([]);
  const [dataStudent, setDataStudent] = useState();
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const handleAddCourse = () => {
    setIsModalOpen(true);
  };
  const handleOk = async (e) => {
    try {
      const response = await axios.post("api/course/create", stateProduct);

      if (response.status === 200) {
        alert(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const mutation = useMutationHooks((data) => CourseServices.getAllCourse());
  const { data, isSuccess, isLoading } = mutation;
  useEffect(() => {
    mutation.mutate();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      if (user?.isRole === "teacher") {
        const dataAllCourse =
          data?.data.filter((element) =>
            element.createdBy.includes(user?.id)
          ) ?? [];
        setDataCourse(dataAllCourse);
      } else {
        const dataAllCourse = data?.data ?? [];
        setDataCourse(dataAllCourse);
      }
    }
  }, [isSuccess]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancelListStudent = () => {
    setIsModalOpenListStudent(false);
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
  const handleOnchangeAvatarDetail = async ({ fileList }) => {
    const file = fileList?.[0];
    if (!file?.url && !file?.preview) {
      file.preview = await getBase64(file?.originFileObj);
    }
    setStateProductDetail({
      ...stateProductDetail,
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
      const response = await axios.get(`api/course/get-details/${id}`);
      setStateProductDetail(response.data.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const handleSubmitUpdate = async (id) => {
    console.log(id);

    try {
      const response = await axios.put(
        `api/course/update/${id}`,
        stateProductDetail
      );

      if (response.status === 200) {
        alert("cập nhật thành công");
        window.location.reload();
        return setOpen(false);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`api/course/delete/${id}`);

      if (response.status === 200) {
        alert(response.data.message);
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const handleListStudent = async (id) => {
    setIsModalOpenListStudent(true);
    try {
      const response = await axios.get(`api/course/get-details/${id}`);

      if (response.status === 200) {
        setDataStudent(response?.data?.data?.userFollow);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
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
              readonly="readonly"
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
      <Modal
        title="Danh sách học sinh"
        open={isModalOpenListStudent}
        onOk={handleCancelListStudent}
        onCancel={handleCancelListStudent}
      >
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <table>
            <thead className={styles.courseTitle}>
              <tr>
                <th>Id học sinh</th>
                <th>Tên học sinh</th>
              </tr>
            </thead>
            <tbody className={styles.courseBody}>
              {dataStudent?.map((data) => {
                return (
                  <tr key={data._id}>
                    <th>{data.userId}</th>
                    <th>{data.userName}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      </Modal>
      {open && (
        <Drawer
          title="Update"
          placement="right"
          onClose={onClose}
          open={open}
          closable={false}
          size="large"
        >
          <form>
            <div className={styles.inputAdd}>
              <p>Tên lớp:</p>
              <input
                type="text"
                name="name"
                value={stateProductDetail.name}
                onChange={handleOnchangeDetail}
              />
            </div>
            <div className={styles.inputAdd}>
              <p>Giới thiệu:</p>
              <textarea
                type=""
                name="description"
                value={stateProductDetail.description}
                onChange={handleOnchangeDetail}
              />
            </div>
            <div className={styles.inputAdd}>
              <p>Loại:</p>
              <input
                type="text"
                name="type"
                value={stateProductDetail.type}
                onChange={handleOnchangeDetail}
              />
            </div>
            <div className={styles.inputAdd}>
              <p>Giá:</p>
              <input
                type="text"
                name="price"
                value={stateProductDetail.price}
                onChange={handleOnchangeDetail}
              />
            </div>
            <div className={styles.inputAdd}>
              <p>Giáo viên:</p>
              <input
                type="text"
                name="createdBy"
                value={stateProductDetail.createdBy}
                readonly="readonly"
              />
            </div>
            <WrapperUploadFile
              onChange={handleOnchangeAvatarDetail}
              maxCount={1}
            >
              <Button>Select File</Button>
              {stateProductDetail?.image && (
                <img
                  src={stateProductDetail?.image}
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
            <div>
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
                    onClick={() => handleDelete(data._id)}
                  />{" "}
                  <GrUpdate
                    size={20}
                    className={styles.updateIcon}
                    onClick={() => handleUpdate(data._id)}
                  />
                  <div className={styles.addCourse}>
                    <Link to={`lesson/${data._id}`}> Quản lý bài học</Link>
                  </div>
                  <div className={styles.addCourse}>
                    <Link to={`call/${data._id}`}> Vào học</Link>
                  </div>
                  <div className={styles.addCourse}>
                    <div onClick={() => handleListStudent(data._id)}>
                      {" "}
                      Danh sách học sinh
                    </div>
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
