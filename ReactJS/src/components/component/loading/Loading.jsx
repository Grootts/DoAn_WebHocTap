import { Spin } from "antd";
import React from "react";

const Loading = ({ children, isLoading, deday = 200 }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      <Spin spinning={isLoading} delay={deday}>
        {children}
      </Spin>
    </div>
  );
};

export default Loading;
