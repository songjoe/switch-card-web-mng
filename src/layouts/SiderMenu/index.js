/*
 * @Author: SongYijie
 * @Date: 2020-05-29 11:31:21
 * @LastEditors: SongYijie
 */ 
import React, { useState, useEffect, useMemo } from 'react';
import { Menu, Layout } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { array, bool } from 'prop-types';
import { connect } from 'react-redux';

import Logo from '@/components/Logo';
import styles from './styles.less';

const { SubMenu, Item: MenuItem } = Menu;
const { Sider } = Layout;

const SiderMenu = ({ routes, collapsed }) => {

  const { pathname } = useLocation();

  const [openKeys, setOpenKeys] = useState([]);

  useEffect(() => {
    const list = pathname.split('/').splice(1);
    setOpenKeys(list.map((_, index) => `/${list.slice(0, index + 1).join('/')}`));
  }, [pathname]);

  const handleGetSelectedKeys = useMemo(() => {
    const list = pathname.split('/').splice(1);
    return list.map((_, index) => `/${list.slice(0, index + 1).join('/')}`);
  }, [pathname]);

  const handleOpenChange = keys => {
    setOpenKeys(keys);
  };

  const renderMenuItem = routes => {
    return routes
      .filter(item => item.path && item.name && !item.hideInMenu)
      .map(subMenu => {
        if ( subMenu.childRoutes && !!subMenu.childRoutes.find(child => child.path && child.name && !child.hideInMenu)) {
          return (
            <SubMenu
              key={subMenu.path}
              title={
                <div>
                  {subMenu.icon}
                  <span>{subMenu.name}</span>
                </div>
              }
            >
              {renderMenuItem(subMenu.childRoutes)}
            </SubMenu>
          );
        }
        return (
          <MenuItem key={subMenu.path}>
            <Link to={subMenu.path}>
              <span>
                {subMenu.icon}
                <span>{subMenu.name}</span>
              </span>
            </Link>
          </MenuItem>
        );
      });
  };

  return (
    <Sider
      collapsible
      trigger={null}
      width={256}
      className={styles.siderMenu}
      collapsed={collapsed}
    >
      <Link className={styles.logoWrap} to='/home'>
        <Logo showText={!collapsed} />
      </Link>
      <Menu
        mode="inline"
        theme="dark"
        className={styles.menu}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        selectedKeys={handleGetSelectedKeys}
      >
        {renderMenuItem(routes)}
      </Menu>
    </Sider>
  )
}

SiderMenu.propTypes = {
  routes: array.isRequired,
  collapsed: bool.isRequired
}

const mapStateToProps = state => ({
  collapsed: state.system.collapsed
});

export default connect(mapStateToProps)(SiderMenu);