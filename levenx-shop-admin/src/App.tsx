import React, { Component } from 'react';
import { Header } from 'src/components';
import { Home, NotFount, Login, ContentConfig, OrderConfig, GoodsConfig, ClassifyConfig, Setting } from "src/pages";
import { renderRoutes } from './utils/renderRoutes';
import { BrowserRouter } from "react-router-dom";
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import store from 'src/store/store';
import { Message } from 'src/components';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    requiresAuth: false,
  },
  {
    path: '/order/config',
    exact: true,
    component: OrderConfig
  },
  {
    path: '/content/config',
    exact: true,
    component: ContentConfig
  },
  {
    path: '/goods/config',
    exact: true,
    component: GoodsConfig
  },
  {
    path: '/classify/config',
    exact: true,
    component: ClassifyConfig
  },
  {
    path: '/login',
    component: Login,
    requiresAuth: false,

  },
  {
    path: '/setting',
    component: Setting,
    requiresAuth: false, //需要登陆后才能跳转的页面

  },
  {
    path: '*',
    component: NotFount,
    requiresAuth: false,
  }
]

class App extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Header />
            <Message>
              {renderRoutes(routes)}
            </Message>
          </Layout>
        </BrowserRouter>
      </Provider>
    )
  }

}

export default App;