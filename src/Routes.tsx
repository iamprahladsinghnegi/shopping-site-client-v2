import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Bye } from './pages/Bye';
import { Cart } from './pages/Cart/Cart';
// import { Header } from './pages/Header';
import { Header } from './pages/Header/Header';
import { Home } from './pages/Home';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/bye" component={Bye} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

