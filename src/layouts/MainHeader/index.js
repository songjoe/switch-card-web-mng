import React, { createElement, useEffect } from 'react';
import { Layout, Row, Col, Dropdown, Menu, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { bool, func, array } from 'prop-types';
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { pathToRegexp } from 'path-to-regexp';

import { onToggleCollapsed } from '@/actions/system';
import { urlToList } from '@/utils';
import styles from './styles.less';

const { Header } = Layout;
const { Item: MenuItem } = Menu;
const { Item: BreadcrumbItem } = Breadcrumb;

const MainHeader = ({ collapsed, onToggleCollapsed, routes }) => {

  let userInfo = Cookies.get('account') || JSON.stringify({});
  userInfo = JSON.parse(userInfo);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const width = window.screen.width;
    if (width < 768) {
      onToggleCollapsed();
    }
  }, [onToggleCollapsed]);

  const handleLogout = () => {
    Cookies.remove('account');
    Cookies.remove('token');
    history.replace('/login');
  }

  const menu = (
    <Menu>
      <MenuItem key="1" onClick={handleLogout}>
        <LogoutOutlined />
        &nbsp; 退出登录
      </MenuItem>
    </Menu>
  );

  const renderBreadcrumb = (routes, url, component = {}) => {
    routes.forEach(item => {
      if (item.path === '*') {
        return false;
      }
      if (pathToRegexp(item.path, []).test(url)) {
        component = item;
      } else if (item.childRoutes && Array.isArray(item.childRoutes)) {
        component = renderBreadcrumb(item.childRoutes, url, component);
      }
    })
    return component;
  }

  const breadcrumb = () => {
    let pathList = urlToList(location.pathname);
    const linkElement = Link;
    const extraBreadcrumbItems = pathList.map((url, index) => {
      const currentBreadcrumb = renderBreadcrumb(routes, url);
      const isLinkable = index !== pathList.length - 1 && currentBreadcrumb.component;
      return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
        <BreadcrumbItem key={url}>
          {createElement(
            isLinkable ? linkElement : 'span',
            { [linkElement === 'a' ? 'href' : 'to']: url },
            currentBreadcrumb.name,
          )}
        </BreadcrumbItem>
      ) : null;
    });
    // Add home breadcrumbs to your head
    extraBreadcrumbItems.unshift(
      <BreadcrumbItem key="home">
        {createElement(linkElement, {
          [linkElement === 'a' ? 'href' : 'to']: '/',
        })}
      </BreadcrumbItem>
    );
    return (
      <div style={{ display: 'inline-block' }}>
        <Breadcrumb separator='/'>
          {extraBreadcrumbItems}
        </Breadcrumb>
      </div>
    );
  };

  return (
    <Header className={styles.mainHeader}>
      <Row type="flex" style={{ paddingRight: 20 }}>
        <Col style={{ flex: 1 }}>
          {
            React.createElement(
              !collapsed ? MenuFoldOutlined : MenuUnfoldOutlined,
              {
                className: styles.trigger,
                onClick: onToggleCollapsed
              }
            )
          }
          {breadcrumb()}
        </Col>
        <Col>
          <Dropdown overlay={menu} trigger={['click', 'hover']} placement="bottomCenter">
            <div className={styles.userInfo}>
              <span className={styles.userImg} />
              <span className={styles.userName}>{userInfo.userName}</span>
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  )
}

MainHeader.propTypes = {
  collapsed: bool.isRequired,
  onToggleCollapsed: func.isRequired,
  routes: array.isRequired
}

const mapStateToProps = state => ({
  collapsed: state.system.collapsed
});

export default connect(mapStateToProps, {
  onToggleCollapsed
})(MainHeader);
