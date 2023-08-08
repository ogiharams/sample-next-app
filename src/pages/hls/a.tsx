import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);
  // const video = videoRef.current;
  // const tsBlobs = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const oneFrameRate = 1 / 29.97;
  // const hls = new Hls();
  // let video = document.querySelector("video");

  // useEffect(() => {
  //   if (!videoRef.current) return;

  //   if (Hls.isSupported()) {
  //     const hls = new Hls({
  //       debug: true,
  //       enableWorker: true,
  //       lowLatencyMode: true,
  //       backBufferLength: 90,
  //     });
  //     hls.loadSource(url);
  //     hls.attachMedia(videoRef.current);
  //     hls.startLoad();
  //     console.log(hls);
  //     // console.log(hls.audioTracks);
  //     // const videoTracks = document.querySelector("video").videoTracks;
  //     const mediaSource = new window.MediaSource();
  //     // console.log(mediaSource.readyState); // closed
  //     // video.addEventListener("timeupdate", () => {
  //     //   console.log("timeupdate", videoRef.current.currentTime);
  //     // });
  //     // video.src = URL.createObjectURL(mediaSource);
  //     // video.src = URL.createObjectURL(mediaSource);
  //     // video = "URL.createObjectURL(mediaSource)";

  //     // mediaSource.addEventListener("sourceopen", function () {
  //     //   const sourceBuffer = mediaSource.addSourceBuffer("video/mp2t");

  //     //   // 特定の.tsファイルのURLを設定する
  //     //   const tsUrl = "http://localhost:3000/hls/output10.ts";

  //     //   fetch(tsUrl)
  //     //     .then((response) => response.arrayBuffer())
  //     //     .then(function (buffer) {
  //     //       // MPEG-2 TSファイルをバッファに追加する
  //     //       sourceBuffer.appendBuffer(buffer);
  //     //     });
  //     // });

  //     console.log(mediaSource);
  //     // console.log(video);
  //     hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //       setIsPlaying(true);
  //     });
  //     hls.on(Hls.Events.BUFFER_APPENDING, function (event, data) {
  //       console.log("Loading segment ", data, event);
  //     });
  //   } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
  //     videoRef.current.src = url;
  //     videoRef.current.addEventListener("loadedmetadata", () => {
  //       setIsPlaying(true);
  //     });
  //   } else {
  //     console.log("HLS not supported");
  //   }
  // }, [url]);

  // useEffect(() => {
  //   var video = (video = document.querySelector("video"));

  //   // MediaSourceオブジェクトの作成
  //   var mediaSource = new MediaSource();
  //   video.src = window.URL.createObjectURL(mediaSource);

  //   // sourceopenイベントの監視
  //   mediaSource.addEventListener("sourceopen", function () {
  //     // SourceBufferオブジェクトの作成
  //     const mime = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
  //     var sourceBuffer = mediaSource.addSourceBuffer(mime);

  //     // HLSストリームのURLを指定
  //     var url = "http://localhost:3000/hls/output.m3u8";

  //     // XMLHttpRequestを使用してHLSストリームを取得
  //     var xhr = new XMLHttpRequest();
  //     xhr.open("GET", url, true);
  //     xhr.responseType = "text";
  //     xhr.onload = function () {
  //       var playlist = xhr.responseText;
  //       var lines = playlist.split("\n");
  //       var tsUrlPrefix = url.substring(0, url.lastIndexOf("/") + 1);
  //       var tsUrls = [];
  //       for (var i = 0; i < lines.length; i++) {
  //         var line = lines[i];
  //         if (line.endsWith(".ts")) {
  //           tsUrls.push(tsUrlPrefix + line);
  //         }
  //       }

  //       var i = 0;

  //       // 順番にtsファイルを取得して再生
  //       function loadNext() {
  //         var tsUrl = tsUrls[i];
  //         console.log(tsUrl);
  //         var xhr2 = new XMLHttpRequest();
  //         xhr2.open("GET", tsUrl, true);
  //         xhr2.responseType = "arraybuffer";
  //         xhr2.onload = function () {
  //           sourceBuffer.appendBuffer(xhr2.response);
  //           i++;

  //           if (i < tsUrls.length) {
  //             if (!sourceBuffer.updating) {
  //               // SourceBuffer が appendBuffer 処理中でなければ次の動画ファイルを読み込む
  //               loadNext();
  //             } else {
  //               // SourceBuffer が appendBuffer 処理中であれば updateend イベントで次の動画ファイルを読み込む
  //               sourceBuffer.addEventListener("updateend", function () {
  //                 loadNext();
  //               });
  //             }
  //           }
  //         };

  //         xhr2.send();
  //       }

  //       loadNext();
  //     };
  //     xhr.send();
  //   });
  // }, []);

  // useEffect(() => {
  //   const hlsUrl = "http://localhost:3000/hls/output.m3u8";
  //   const tsUrls = Array.from(
  //     { length: 118 },
  //     (_, i) =>
  //       `http://localhost:3000/hls/output${i.toString().padStart(2, "0")}.ts`
  //   );

  //   if (Hls.isSupported()) {
  //     const hls = new Hls();
  //     hls.loadSource(hlsUrl);
  //     hls.attachMedia(video);
  //     hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //       tsUrls.forEach((url, index) => {
  //         fetch(url)
  //           .then((response) => response.blob())
  //           .then((blob) => {
  //             tsBlobs.current[index] = blob;
  //             if (tsBlobs.current.filter(Boolean).length === tsUrls.length) {
  //               const concatenatedBlobs = new Blob(tsBlobs.current, {
  //                 type: "video/mp2t",
  //               });
  //               const concatenatedUrl = URL.createObjectURL(concatenatedBlobs);
  //               video.src = concatenatedUrl;
  //               video.play();
  //             }
  //           })
  //           .catch((error) => console.error(error));
  //       });
  //     });
  //   } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
  //     video.src = hlsUrl;
  //     video.addEventListener("loadedmetadata", () => {
  //       video.play();
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   const video = document.querySelector("video");
  //   const hls = new Hls();
  //   const hlsUrl = "http://localhost:3000/hls/output.m3u8";

  //   // Create an array to store the fetched TS blobs
  //   let tsBlobs = [];

  //   hls.loadSource(hlsUrl);
  //   hls.attachMedia(video);
  //   hls.on(Hls.Events.MANIFEST_LOADED, () => {
  //     // Get the level details for the first level

  //     const levelDetails = hls.levels[0].details;

  //     // Get the URL for the first fragment in the first level
  //     const fragmentUrl = levelDetails.fragments[0].url;
  //     console.log(fragmentUrl);

  //     // Fetch the fragment and store it as a blob
  //     fetch(fragmentUrl)
  //       .then((response) => response.blob())
  //       .then((blob) => tsBlobs.push(blob))
  //       .then(() => {
  //         // Concatenate all the TS blobs into a single blob
  //         const concatenatedBlobs = new Blob(tsBlobs, { type: "video/mp2t" });

  //         // Create an object URL for the concatenated blob
  //         const concatenatedUrl = URL.createObjectURL(concatenatedBlobs);
  //         console.log(concatenatedUrl);

  //         // Set the video source to the concatenated URL
  //         video.src = concatenatedUrl;

  //         // Listen for the load event to play the video
  //         video.addEventListener("loadeddata", () => {
  //           video.play();
  //         });
  //       })
  //       .catch((error) => console.error(error));
  //   });

  //   hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
  //     // Get the loaded fragment and store it as a blob
  //     const fragmentBlob = new Blob([data.payload], { type: "video/mp2t" });
  //     console.log(fragmentBlob);
  //     console.log(tsBlobs);

  //     tsBlobs.push(fragmentBlob);
  //     console.log(tsBlobs);
  //   });
  // }, []);

  // ロードはできる;
  useEffect(() => {
    const video = document.querySelector("video");
    const hlsUrl = "http://localhost:3000/hls/output.m3u8";
    const hls = new Hls();

    // Create an array to store the fetched TS blobs
    let tsBlobs = [];

    // Fetch the M3U8 file
    fetch(hlsUrl)
      .then((response) => response.text())
      .then((m3u8) => {
        // Parse the M3U8 file to extract the TS URLs
        const tsUrls = m3u8
          .split("\n")
          .filter((line) => line.endsWith(".ts"))
          .map((line) => new URL(line, hlsUrl).toString());
        console.log(tsUrls);

        // Fetch all the TS files and store them as blobs
        Promise.all(
          tsUrls.map((url) =>
            fetch(url)
              .then((response) => response.blob())
              .then((blob) => tsBlobs.push(blob))
          )
        )
          .then(() => {
            // Concatenate all the TS blobs into a single blob
            const concatenatedBlobs = new Blob(tsBlobs, { type: "video/mp2t" });
            console.log(tsBlobs);

            // Create an object URL for the concatenated blob
            const concatenatedUrl = URL.createObjectURL(concatenatedBlobs);
            console.log(concatenatedUrl);
            //     // Set the video source to the concatenated URL

            video.src = concatenatedUrl;
            // hls.attachMedia(video);
            // hls.loadSource(hlsUrl);

            //     // Listen for the load event to play the video
            //     video.addEventListener("loadeddata", () => {
            //       // Revoke the object URL
            //       // URL.revokeObjectURL(concatenatedUrl);
            //       video.play();
            //     });
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));

    hls.attachMedia(video);
    hls.loadSource(hlsUrl);
    // hls.on(Hls.Events.MANIFEST_PARSED, () => {
    //   video.play();
    // });
  }, []);

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

    videoRef.current.currentTime = videoRef.current.currentTime - oneFrameRate;
    setCurrentTime(videoRef.current.currentTime);
  };

  const settingCurrentTime = (ct) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = ct;
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

  // const loadFile = () => {
  //   if (!videoRef.current) return;
  //   hls.startLoad(10);
  // };
  const fps = 29.97;
  const interval = 1 / fps;

  const rewind = () => {
    if (hls) {
      videoRef.current.currentTime = videoRef.current.currentTime - interval;
      if (videoRef.current.currentTime < 0) {
        videoRef.current.currentTime = 0;
      }
      setCurrentTime(videoRef.current.currentTime);
    }
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
        src={url}
      />
      <div>
        <button onClick={onStepBackwardClick}>{"<<"}</button>
        <button onClick={rewind}>{"<<"}</button>
        {!isPlaying ? (
          <button onClick={onPauseClick}>Pause</button>
        ) : (
          <button onClick={onPlayClick}>Play</button>
        )}
        <button onClick={onStepForwardClick}>{">>"}</button>
        <button onClick={() => settingCurrentTime(251.68)}>{"ct"}</button>
        {/* <button title="hls.startLoad()" onClick={() => loadFile()}>
          Start loading
        </button> */}
      </div>
      <div>
        <span>{currentTime.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default VideoPlayer;
