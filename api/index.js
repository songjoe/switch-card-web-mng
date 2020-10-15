/*
 * @Author: SongYijie
 * @Date: 2020-06-02 14:31:13
 * @LastEditors: SongYijie
 */ 
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import nodeFetch from 'node-fetch';

import routes from './routes';

global.fetch = nodeFetch;

const app = express();

app.use(cors());
app.set('port', process.env.PORT || 9998);

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

// routes
app.use('/api', routes);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
