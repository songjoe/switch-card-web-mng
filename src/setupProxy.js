/*
 * @Author: SongYijie
 * @Date: 2020-06-10 17:42:14
 * @LastEditors: SongYijie
 */ 
const { createProxyMiddleware } = require('http-proxy-middleware');
const { API_URL } = require('./config/apiUrl');

const noMock = process.env.MOCK === 'false';

function proxyMock(app) {
  app.use(createProxyMiddleware([API_URL], {
    target: 'http://localhost:9998',
    pathRewrite: {
      '^/.*/api': '/api' // rewrite path
    }
  }));
}

const PROD_API_HOST = process.env.PROD_API_URL || 'localhost';

function proxyNoMock(app) {
  app.use(createProxyMiddleware(API_URL, {
    target: PROD_API_HOST
  }));
}

module.exports = noMock && PROD_API_HOST ? proxyNoMock : proxyMock;
