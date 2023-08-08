import React from "react";
import VideoPlayer from "./VideoPlayer";
import VideoPlayer1 from "./a";

const Index = () => {
  return (
    <div>
      {/* <VideoPlayer url="../../../hls/output.m3u8" width={100} height={20} /> */}
      <VideoPlayer1 url="../../../hls/output.m3u8" width={100} height={20} />
    </div>
  );
};

export default Index;
