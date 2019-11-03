import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import './App.css';
import Registration from './Pages/registerPage';
import Login from './Pages/loginPage';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import AppBar from './Components/Dashboard/Appbar';
import RegistrationSuccess from './Components/RegistrationSuccess';
import Verify from './Components/Verify';
import Note from './Components/Dashboard/Note';
import dashboard from './Pages/dashboard';
import archive from './Components/Dashboard/archive';
import deletNote from './Components/Dashboard/deletNote';
import deletepage from './Pages/deletepage';
import UnArchieve from './Pages/unArchivePage';
class App extends Component {
  render() {
    return (

      <Router>
        
        <Route path="/" exact component={dashboard}></Route>
        <Route path="/home" component={dashboard}></Route>
        <Route path="/unarchive" component={UnArchieve}></Route>
        <Route path="/registration" component={Registration}></Route>
        <Route path="/forgotpassword" component={ForgotPassword}></Route>
        <Route path="/resetpassword/:token" component={ResetPassword}></Route>
        <Route path="/delete" component={deletepage}></Route>
        <Route path="/registersuccess" component={RegistrationSuccess}></Route>
        <Route path="/verify/:token" component={Verify}></Route>
        
      </Router>
    );
  }
}

export default App;
