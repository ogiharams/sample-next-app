const fs = require("fs");
const bunyan = require("bunyan");
// import bunyan from "bunyan";
const formatOut = require("bunyan-format");

const format = formatOut({ outputMode: "long" });

const log = bunyan.createLogger({
  name: "アプリ名",
  streams: [
    // ログローテーション設定、ログファイル書き込み設定
    // {
    //   level: "info",
    //   type: "rotating-file",
    //   path: "./log/myapp-info.log",
    //   period: "1d", // daily rotation
    //   count: 7, // keep 7 back copies
    // },
    {
      // bunyan-formatを使用してコンソールに表示
      type: "stream",
      stream: format,
      raw: false,
      level: "info",
    },
    {
      // bunyan-formatを使用してコンソールに表示
      type: "stream",
      stream: formatOut({ outputMode: "short" }),
      level: "info",
      raw: true,
      closeOnExit: false,
    },
  ],
  src: true,
});

const childLog = log.child({ module: "モジュール名" });

module.exports = { log, childLog };
// log.info("test");
// export {};
