/*
 * @Author: SongYijie
 * @Date: 2020-03-09 14:47:19
 * @LastEditors: SongYijie
 */
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import LoadingPage from '@/components/LoadingPage';
import config from './config';

const renderRoutes = routes => {
  if (!Array.isArray(routes)) {
    return null;
  }

  return (
    <Switch>
      {routes.map((route, index) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.path || index}
              exact={route.exact}
              strict={route.strict}
              from={route.path}
              to={route.redirect}
            />
          );
        }

        return (
          <Route
            key={route.path || index}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={() => {
              const renderChildRoutes = renderRoutes(route.childRoutes);
              if (route.component) {
                return (
                  <Suspense fallback={<LoadingPage />}>
                    <DocumentTitle title={route.name ? `${route.name} - 中僖创智` : '中僖创智'}>
                      <route.component route={route}>{renderChildRoutes}</route.component>
                    </DocumentTitle>
                  </Suspense>
                );
              }
              return renderChildRoutes;
            }}
          />
        );
      })}
    </Switch>
  );
};

const AppRouter = () => {
  return <Router>{renderRoutes(config)}</Router>;
};

export default AppRouter;
