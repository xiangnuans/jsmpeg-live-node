import React, { useEffect } from "react";

import styles from "./index.module.less";

const JSMpegCom = () => {
  useEffect(() => {
    const video = document.getElementById("video");
    const url = "ws://" + document.location.hostname + ":9998/";
    const player = new window.JSMpeg.Player(url, {
      canvas: video,
      disableWebAssembly: true,
      disableGl: true,
      autoplay: true,
      loop: true
    });
    player.play();
  }, []);

  return (
    <div className={styles["containers"]}>
      <h1>视频直播</h1>
      <canvas id="video" className={styles["video"]}>
        事实上
      </canvas>
    </div>
  );
};

export default JSMpegCom;
