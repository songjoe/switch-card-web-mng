/*
 * @Author: SongYijie
 * @Date: 2020-05-29 11:26:50
 * @LastEditors: SongYijie
 */

const path = require("path");
const CracoLessPlugin = require("craco-less");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: { "@primary-color": "#1DA57A" },
          javascriptEnabled: true,
        }
      },
    },
  ],
  webpack: {
    alias: {
      "@": resolve("./src"),
    },
    plugins: [new AntdDayjsWebpackPlugin()]
  },
};
