import React from "react";
import Title from "../../common/title/Title";

import "./contact.css";

const Contact = () => {
  const map =
    'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fCxc4EsA.woff2,106.6467328,12z/data=!4m6!3m5!1s0x31752949eb3e795f:0xa435dd1685ea2fbc!8m2!3d10.8017971!4d106.6644959!16s%2Fg%2F11hzwcm67k" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" ';
  return (
    <>
      <Title title="Kết nối với chúng tôi" />
      <section className="contacts padding">
        <div className="container shadow flexSB">
          <div className="left row">
            <iframe src={map}></iframe>
          </div>
          <div className="right row">
            <h1>Liên hệ</h1>
            <p>Có thể nhắn trực tiếp cho chúng tôi</p>

            <div className="items grid2">
              <div className="box">
                <h4>ADDRESS:</h4>
                <p>185**************</p>
              </div>
              <div className="box">
                <h4>EMAIL:</h4>
                <p> thongtin@gmail.com</p>
              </div>
              <div className="box">
                <h4>PHONE:</h4>
                <p> 08***********</p>
              </div>
            </div>

            <form action="">
              <div className="flexSB">
                <input type="text" placeholder="Tên" />
                <input type="email" placeholder="Email" />
              </div>
              <input type="text" placeholder="Tiêu đề" />
              <textarea cols="30" rows="10">
                Nhắn tin ở đây......
              </textarea>
              <button className="primary-btn">Gửi</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
