import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";

const Room = () => {
  const user = useSelector((state) => state.user);
  const name = user.name;
  const { roomID } = useParams();
  // if (window.localStorage) {
  //   if (!localStorage.getItem("firstLoad")) {
  //     localStorage["firstLoad"] = true;
  //     window.location.reload();
  //   } else localStorage.removeItem("firstLoad");
  // }
  const meeting = async (element) => {
    const appID = 79029281;
    const serverSecret = "4759ce407700d7ef4747cf2bd286db7f";
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
        width: "90vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    ></div>
  );
};

export default Room;
