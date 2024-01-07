import "./input.css";
import React from 'react';
import Login from "./Login.jsx";
import Forms from "./Forms.jsx";
import SignUp from "./SignUp.jsx";
import Header from './Header.jsx';
import Template from './Template.jsx';
import Addquestion from './Addquestion.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () =>{
  return(
    <Router>
      <Switch>
        <Route path="/forms/">
          <Forms/>
        </Route>
        <Route path="/form">
          <Addquestion/>
        </Route>
        <Route path="/selectform">
          <Header/>
          <Template/>
        </Route>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route path="/">
          <Login/>
        </Route>
      </Switch>
    </Router>
  )
};

export default App;
