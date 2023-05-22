import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";

const Room = () => {
  const user = useSelector((state) => state.user);
  const name = user?.name;
  const { roomID } = useParams();
  // if (window.localStorage) {
  //   if (!localStorage.getItem("firstLoad")) {
  //     localStorage["firstLoad"] = true;
  //     window.location.reload();
  //   } else localStorage.removeItem("firstLoad");
  // }
  const meeting = async (element) => {
    const appID = 1223037231;
    const serverSecret = "0555d1c4649152716da9747e5d477998";
    console.log(roomID);

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      name
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };
  return (
    <div
      ref={meeting}
      style={{
        width: user?.isRole === "student" ? "100vw" : "90vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    ></div>
  );
};

export default Room;
