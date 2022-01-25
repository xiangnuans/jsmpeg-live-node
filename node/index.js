const Stream = require("node-rtsp-stream");
// 设置rtsp视频流地址
const rtsp_urls =
  "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov";
const streams = new Stream({
  name: "sockets",
  streamUrl: rtsp_urls,
  wsPort: 9998,
  ffmpegOptions: {
    // 选项ffmpeg标志
    "-stats": "", // 没有必要值的选项使用空字符串
    "-r": 30 // 具有必需值的选项指定键后面的值<br>　　　　'-s':'1920*1080'
  }
});
