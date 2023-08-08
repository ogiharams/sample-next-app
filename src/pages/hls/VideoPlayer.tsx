import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!videoRef.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsPlaying(true);
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = url;
      videoRef.current.addEventListener("loadedmetadata", () => {
        setIsPlaying(true);
      });
    } else {
      console.log("HLS not supported");
    }
  }, [url]);

  const onPlayClick = () => {
    if (!videoRef.current) return;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const onPauseClick = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const onStepBackwardClick = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime -= 1 / videoRef.current.playbackRate;
    setCurrentTime(videoRef.current.currentTime);
  };

  const onStepForwardClick = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += 1 / videoRef.current.playbackRate;
    setCurrentTime(videoRef.current.currentTime);
  };

  const onTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const seekToTime = (seekTime) => {
    // シーク位置から再生位置よりも前のセグメントの URL を取得する。
    const url = getSegmentUrlBeforeTime(seekTime);

    // キャッシュにある場合はそれを使用する。
    caches
      .match(url)
      .then((response) => {
        if (response) {
          return response.arrayBuffer();
        } else {
          return fetch(url).then((response) => {
            return response.arrayBuffer();
          });
        }
      })
      .then((buffer) => {
        // SourceBuffer オブジェクトにデータを追加する。
        const sourceBuffer = getSourceBuffer();
        sourceBuffer.appendBuffer(buffer);
      });
  };

  function getSegmentUrlBeforeTime(time) {
    const playlist = getPlaylist(); // プレイリストの URL を取得する。
    const segments = getSegments(playlist); // セグメントの URL のリストを取得する。

    // time よりも前にあるセグメントを取得する。
    const segment = segments.reverse().find((segment) => {
      return segment.endTime <= time;
    });

    return segment.url;
  }

  return (
    <div>
      <video
        ref={videoRef}
        className="video-js"
        controls
        playsInline
        style={{ width: "100%", height: "auto" }}
        onTimeUpdate={onTimeUpdate}
      />
      <div>
        <button onClick={onStepBackwardClick}>{"<<"}</button>
        {isPlaying ? (
          <button onClick={onPauseClick}>Pause</button>
        ) : (
          <button onClick={onPlayClick}>Play</button>
        )}
        <button onClick={onStepForwardClick}>{">>"}</button>
      </div>
      <div>
        <span>{currentTime.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default VideoPlayer;
