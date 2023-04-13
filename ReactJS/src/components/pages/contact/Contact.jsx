import React from "react";
import Title from "../../common/title/Title";

import "./contact.css";

const Contact = () => {
  
  return (
    <>
      <Title title="Kết nối với chúng tôi" />
      <section className="contacts padding">
        <div className="container shadow">
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
