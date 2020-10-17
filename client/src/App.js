import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Retro from "./pages/Retro";
import Main from "./pages/Main";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client'


const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/retro" component={Retro} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
