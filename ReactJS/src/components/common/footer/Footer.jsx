import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container padding">
          <div className="box logo">
            <h1>B&Đ</h1>
            <span>WEBSITE HỌC TẬP HÀNG ĐẦU VIỆT NAM</span>
            <p>
              Đừng để thời gian rảnh rỗi của bạn lãng phí, chúng tôi luôn đồng
              hành cùng bạn
            </p>
          </div>

          <div className="box last">
            <h3>Thông tin liên hệ</h3>
            <ul>
              <li>
                <i className="fa fa-map"></i>
                116, Nguyễn Thái Sơn, Gò Vấp, HCM
              </li>
              <li>
                <i className="fa fa-phone-alt"></i>
                +08************
              </li>
              <li>
                <i className="fa fa-paper-plane"></i>
                thongtin@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="legal">
        <p>
          Đồ án tốt nghiệp 2022-2023
          <i className="fa fa-heart"></i> by Nguyễn Văn Bằng & Phùng Phú Đạt
        </p>
      </div>
    </>
  );
};

export default Footer;
