/*
 * @Author: SongYijie
 * @Date: 2020-05-29 16:27:18
 * @LastEditors: SongYijie
 */ 
import React from 'react';
import { LogoProps } from '@/types';
import LogoImg from '@/assets/images/logo.png';
import styles from './styles.module.less';

const Logo = (props: LogoProps) => {
  const { showText } = props;
  console.log(showText)
  return (
    <div className={styles['logo-wrap']}>
      <img src={LogoImg} alt="logo" className="logo" />
      <p className="name">中僖创智</p>
    </div>
  )
}

export default Logo;