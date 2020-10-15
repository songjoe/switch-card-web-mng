/*
 * @Author: SongYijie
 * @Date: 2020-05-29 16:27:18
 * @LastEditors: SongYijie
 */ 
import React from 'react';
import { CopyrightOutlined } from '@ant-design/icons';
import { ICopyRightProps } from '@/types';
import styles from './styles.less';

const Logo = (props: ICopyRightProps) => {
  const { style } = props;
  return (
    <div className={styles.copyRightWrap} style={style}>
      Copyright <CopyrightOutlined /> 公司 <a href="http://www.beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">备案号</a>
    </div>
  )
}

export default Logo;