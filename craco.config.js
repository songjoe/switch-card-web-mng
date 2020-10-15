/*
 * @Author: SongYijie
 * @Date: 2020-05-29 11:26:50
 * @LastEditors: SongYijie
 */

const path = require("path");
const CracoLessPlugin = require("craco-less");

const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        modifyLessRule: function(lessRule, _context) {
          lessRule.test = /\.(module)\.(less)$/;
          lessRule.exclude = /node_modules/;

          return lessRule;
        },
        lessLoaderOptions: {
          modifyVars: { "@primary-color": "#1DA57A" },
          javascriptEnabled: true
        }
      },
    },
    {
      plugin: CracoLessPlugin,
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: "[local]_[hash:base64:5]",
            context: path.resolve(__dirname, 'src')
          }
        }
      }
    }
  ],
  webpack: {
    alias: {
      "@": resolve("./src"),
    }
  },
};
