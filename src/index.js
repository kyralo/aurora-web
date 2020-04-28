import React from 'react';
import ReactDOM from 'react-dom';

import './index.css'

import { Provider } from 'react-redux'
import store from './redux'

import { history } from '@utils/history';


// import router from '@router'
// import { RouteTraverse } from '@utils/router'


import {
  Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";

import Login from '@views/Login'
import Register from '@views/Register'
import Home from '@views/Home'

import NotFound from "@comp/NotFound"



const App = (
    <Provider store={store}>
      <Router  history={ history }>
        <Switch>
          <Route strict exact path="/" component={Home}>
            <Redirect to="/aurora"/>
          </Route>
          <Route path="/aurora" component={Home} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/error" component={NotFound}/>
        </Switch>
      </Router>
    </Provider>
);

ReactDOM.render(App, document.getElementById('root'));
