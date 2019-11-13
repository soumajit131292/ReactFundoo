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
import DisplayLabelNotes from './Components/Dashboard/displayLabelNotes';
import Label from './Pages/label';
import remainder from './Pages/remainder';
class App extends Component {
  render() {
    return (
      
      <Router>
        Label
        <Route path="/" exact component={Login}></Route>
        <Route path="/home" component={dashboard}></Route>
        <Route path="/labelnotes/:labelForNote" component={Label} ></Route>
        <Route path="/unarchive" component={UnArchieve}></Route>
        <Route path="/registration" component={Registration}></Route>
        
        {/* <Route path="/labelnote" component={Label}></Route> */}

        <Route path="/forgotpassword" component={ForgotPassword}></Route>
        <Route path="/resetpassword/:token" component={ResetPassword}></Route>
        <Route path="/delete" component={deletepage}></Route>
        <Route path="/registersuccess" component={RegistrationSuccess}></Route>
        <Route path="/verify/:token" component={Verify}></Route>
        <Route path="/remainder" component={remainder}></Route>
        
      </Router>
    );
  }
}

export default App;
