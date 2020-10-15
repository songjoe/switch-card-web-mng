/*
 * @Author: SongYijie
 * @Date: 2020-05-29 16:27:18
 * @LastEditors: SongYijie
 */ 
import React from 'react';
import { ILogoProps } from '@/types';
import LogoImg from '@/assets/images/logo.png';
import styles from './styles.less';

const Logo = (props: ILogoProps) => {
  const { showText, style } = props;
  return (
    <div className={styles.logoWrap} style={style}>
      <img src={LogoImg} alt="logo" className={styles.logo} />
      {
        showText && <p className={styles.name}>中僖创智</p>
      }
    </div>
  )
}

export default Logo;