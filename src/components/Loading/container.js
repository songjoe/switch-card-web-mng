/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:47:34
 * @LastEditors: SongYijie
 */ 
import React from 'react';
import { bool } from 'prop-types';
import { Spin } from 'antd';

import styles from './styles.less';

const Loading = ({ isLoading }) =>
  isLoading && (
    <div className={styles.loading}>
      <Spin tip="加载中..." />
    </div>
  );

Loading.propTypes = {
  isLoading: bool
};

Loading.defaultProps = {
  isLoading: false
};

export default Loading;
