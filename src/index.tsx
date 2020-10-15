
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

import { defaultValidateMessages } from '@/constants/formRulesMessages';
import Root from './pages/Root';

import './index.module.less';

ReactDOM.render(
  <ConfigProvider locale={zhCN} form={{ validateMessages: defaultValidateMessages }}>
    <Root />
  </ConfigProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
