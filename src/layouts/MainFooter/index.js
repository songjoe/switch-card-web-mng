/*
 * @Author: SongYijie
 * @Date: 2020-05-29 11:31:21
 * @LastEditors: SongYijie
 */ 
import React from 'react';
import { Layout } from 'antd';

import CopyRight from '@/components/CopyRight';

const { Footer } = Layout;

const MainFooter = () => {
  return (
    <Footer>
      <CopyRight />
    </Footer>
  )
}

export default MainFooter;
