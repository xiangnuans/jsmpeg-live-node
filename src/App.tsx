import { HashRouter, Route, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';

import { ConfigProvider } from 'antd';
import { Layout } from '@components/index';
import { Provider as StoreProvider } from 'react-redux';
import { routerConfig } from '@routes/index';
import store from '@stores/index';
import zhCN from 'antd/es/locale/zh_CN';

const Loading = () => <div />;

function App() {
  return (
    <StoreProvider store={store}>
      <ConfigProvider locale={zhCN}>
        <HashRouter>
          <Layout>
            <Suspense fallback={<Loading />}>
              <Switch>
                {routerConfig.map(route => (
                  <Route key={route.path} {...route} />
                ))}
              </Switch>
            </Suspense>
          </Layout>
        </HashRouter>
      </ConfigProvider>
    </StoreProvider>
  );
};

export default App;
