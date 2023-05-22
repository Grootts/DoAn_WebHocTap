import React, { useEffect, useState } from "react";
import styles from "./Courses.module.css";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../../hook/useMutationHook";
import * as CourseServices from "../../../services/CourseServices";
import { convertPrice } from "../../../utils";
import { IoMdSearch } from "react-icons/io";
import { useDebounce } from "../../../hook/useDebounce";
import Loading from "../../component/loading/Loading";
const CoursesCard = () => {
  const navigate = useNavigate();
  const [coursesCard, setDataCourse] = useState([]);
  const [search, setSearch] = useState("");
  const [time, setTime] = useState(2000);
  const searchDebounce = useDebounce(search, time);

  useEffect(() => {
    mutation.mutate(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce]);
  const mutation = useMutationHooks((data) =>
    CourseServices.getAllCourse(search)
  );

  const { data, isLoading, isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      setDataCourse(data?.data);
    }
    if (isError) {
      alert("error call api");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  const onSearch = (e) => {
    setSearch(e.target.value);
    setTime(2000);
    console.log(search);
  };
  const handleSearch = async () => {
    return setTime(0);
  };

  const handleCourseDetail = (_id) => {
    navigate(`/courseDetail/${_id}`);
  };
  return (
    <>
      {/* <p className={styles.textTitle}>Tất cả các lớp học</p> */}

      <div className={styles.newletter}>
        <div className={styles.right}>
          <div>
            <input
              type="text"
              placeholder="Tìm kiếm khóa học ..."
              onChange={onSearch}
              value={search}
            />
          </div>
          <div className={styles.buttonSearch} onClick={handleSearch}>
            <IoMdSearch className={styles.icon} size={25} />
            Search
          </div>
        </div>
      </div>

      <Loading isLoading={isLoading}></Loading>

      <div className={styles.coursesCardStyles}>
        {isSuccess &&
          coursesCard?.map((couser) => {
            return (
              <div className={styles.coursesCard}>
                <div key={couser._id}>
                  <img className={styles.image} src={couser.image} alt="" />
                  <div className={styles.button}>
                    <button onClick={() => handleCourseDetail(couser._id)}>
                      Xem thông tin lớp
                    </button>
                  </div>
                </div>
                <div className={styles.coursesCardText}>
                  <h3>{couser.name}</h3>
                  <h4>{convertPrice(couser.price)} </h4>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default CoursesCard;
