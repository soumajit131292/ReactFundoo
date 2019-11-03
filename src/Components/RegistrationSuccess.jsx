import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';

 class RegistrationSuccess extends Component {
    render() {
        return (
            <div className='registerPage'>

            <AppBar >
                <Toolbar>

                    <Typography variant="h4" className='title' >
                        Fundoo Note App
                        </Typography>
                    {/* <Button color="inherit" className="login-button">LogIn</Button> */}
                    
                </Toolbar>
            </AppBar>
            <div className="success-register">

            <h3>You have successfully registered.To verify your credientials please check email.</h3>

            </div>

            </div>
        )
    }
}
export default withRouter(RegistrationSuccess);