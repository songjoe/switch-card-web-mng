/*
 * @Author: SongYijie
 * @Date: 2020-05-29 11:31:21
 * @LastEditors: SongYijie
 */ 
import React from 'react';
import { Layout, Card } from 'antd';

import SiderMenu from '../SiderMenu';
import MainHeader from '../MainHeader';
import MainFooter from "../MainFooter";

import styles from './style.less';

const BasicLayout = ({ route, children }) => {
  return (
    <Layout className={styles.mainLayout}>
      <SiderMenu routes={route.childRoutes} />
      {/* 左侧菜单导航 */}
      <Layout className={styles.mainLayoutRight}>
        <MainHeader routes={route.childRoutes} />
        <Layout.Content className={styles.mainLayoutContent}>
          <div>
            <Card style={{ minHeight: '100%' }}>
              {children}
            </Card>
            <MainFooter />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
