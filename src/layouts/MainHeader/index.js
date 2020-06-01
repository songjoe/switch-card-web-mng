/* eslint-disable import/extensions */
import React, { createElement } from 'react';
import { Layout, Icon, Dropdown, Menu, Row, Col, Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import { observer } from 'mobx-react';
import { appStores } from '@/stores';
import { urlToList } from '@/utils';
import './style.less';
import { isObservableMap } from 'mobx';

const menu = (
  <Menu>
    <Menu.Item key="0">
      <Icon type="smile" />
      个人信息
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="1">
      <Link to="/login">
        <Icon type="logout" />
        &nbsp; 退出登录
      </Link>
    </Menu.Item>
  </Menu>
);

const MainHeader = ({ routes }) => {
  const { globalStore } = appStores();

  const renderBreadcrumb = (routes, url, component = {}) => {
    routes.forEach(item => {
      if (item.path === url) {
        component = item;
      } else if (item.childRoutes && Array.isArray(item.childRoutes)) {
        component = renderBreadcrumb(item.childRoutes, url, component);
      }
    })
    return component;
  }

  const breadcrumb = () => {
    let pathList = urlToList(useLocation().pathname);
    const linkElement = 'a';
    const extraBreadcrumbItems = pathList.map((url, index) => {
      const currentBreadcrumb = renderBreadcrumb(routes, url);
      const isLinkable = index !== pathList.length - 1 && currentBreadcrumb.component;
      return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
        <Breadcrumb.Item key={url}>
          {createElement(
            isLinkable ? linkElement : 'span',
            { [linkElement === 'a' ? 'href' : 'to']: url },
            currentBreadcrumb.name,
          )}
        </Breadcrumb.Item>
      ) : null;
    });
    // Add home breadcrumbs to your head
    extraBreadcrumbItems.unshift(
      <Breadcrumb.Item key="home">
        {createElement(linkElement, {
          [linkElement === 'a' ? 'href' : 'to']: '/',
        })}
      </Breadcrumb.Item>
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
    <Layout.Header className="main-header">
      <Row type="flex" style={{ paddingRight: 20 }}>
        <Col style={{ flex: 1 }}>
          <Icon
            className="trigger"
            type={globalStore.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={globalStore.toggleCollapsed}
          />
          {breadcrumb()}
        </Col>
        <Col>
          <Dropdown overlay={menu} trigger={['click', 'hover']} placement="bottomCenter">
            <div className="user-info">
              <span className="user-img" />
              <span className="user-name">{globalStore.userInfo.loginName}</span>
            </div>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default observer(MainHeader);
