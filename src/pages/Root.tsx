/*
 * @Author: SongYijie
 * @Date: 2020-06-09 14:44:51
 * @LastEditors: SongYijie
 */ 
import React from 'react';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import { ConnectedRouter } from 'connected-react-router';

import Loading from '@/components/Loading';
import Routes from '@/router/AppRouter';
import configureStore from '@/store/configureStore';
import history from '@/store/history';

const store = configureStore();

const Root = () => {

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Layout className="root-layout">
          <Routes />
          <Loading />
        </Layout>
      </ConnectedRouter>
    </Provider>
  );
}

export default Root;
