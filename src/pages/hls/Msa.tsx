import React, { useState, useEffect, useRef } from "react";

function VideoPlayer() {
  const [mediaSource, setMediaSource] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (
      MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
    ) {
      const ms = new MediaSource();
      setMediaSource(ms);
    } else {
      console.error(
        'Unsupported MIME type or codec: video/mp4; codecs="avc1.42E01E,mp4a.40.2"'
      );
    }
  }, []);

  useEffect(() => {
    if (!mediaSource) return;

    const video = videoRef.current;
    video.src = URL.createObjectURL(mediaSource);

    const sourceBuffer = mediaSource.addSourceBuffer(
      'video/mp4; codecs="avc1.42E01E,mp4a.40.2"'
    );

    // ここから先は前述の例と同じです
    sourceBuffer.addEventListener("updateend", () => {
      if (!sourceBuffer.updating && mediaSource.readyState === "open") {
        fetch(segmentURL)
          .then((response) => response.arrayBuffer())
          .then((data) => {
            sourceBuffer.appendBuffer(data);
          });
      }
    });

    // fetch 関数で m4s ファイルを取得してから sourceBuffer.appendBuffer() でバッファーに追加する等の処理を行います

    return () => {
      sourceBuffer.removeEventListener("updateend" /* handler */);
    };
  }, [mediaSource]);

  // 以下は前述の例と同じです
  return <video ref={videoRef} controls></video>;
}
