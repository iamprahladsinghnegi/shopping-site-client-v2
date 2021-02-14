import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Bye } from './pages/Bye';
import { Cart } from './pages/Cart/Cart';
// import { Header } from './pages/Header';
import { Header } from './pages/Header/Header';
import { Home } from './pages/Home/Home';
import { Items } from './pages/Items/Items';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Layout.Content>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/items" component={Items} />
            <Route path="/cart" component={Cart} />
            <Route path="/bye" component={Bye} />
            <Redirect from={"*"} to={'/'} />
          </Switch>
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  );
};

