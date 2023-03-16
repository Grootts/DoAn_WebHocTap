import CoursesCard from "../allcourses/CoursesCard";

import "./Search.css";
const Search = () => {
  return (
    <div>
      <section className="newletter">
        <div className="container flexSB">
          <div className="left row">
            <h1>Tìm kiếm khóa học mà bạn cần</h1>
          </div>
          <div className="right row">
            <input type="text" placeholder="Nhập vào đây ..." />
            <i class="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
      </section>
      <CoursesCard />
    </div>
  );
};
export default Search;
