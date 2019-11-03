import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Card, Link } from '@material-ui/core';
import { userLogin } from '../Controller/Usercontroller';
import { Snackbar, IconButton } from '@material-ui/core';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            message: '',
            Error:false,
        }
    }
    onChangePassword = (event) => {
        var password = event.target.value;
        this.setState({
            password: password
        })
    }
    onChangeEmail = (event) => {
        var emailId = event.target.value;
        this.setState({
            email: emailId
        })
    }
    handleSubmit = () => {
        if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
            this.setState({
                Error:true,
                message: "email can't be null"
            })
        }
        else if (this.state.password === null || this.state.password.length < 8) {
            this.setState({
Error:true,
                message: "Password should be min 8"
            })
        }

        else {
            var userLoginDetails = {

                "email": this.state.email,
                "password": this.state.password,
            }
            console.log("login", userLoginDetails)
            userLogin(userLoginDetails).then(res => {
                console.log(res.data);
                localStorage.setItem("token", res.data.token);
                console.log(localStorage.getItem('token'));
                
                this.props.history.push('/')
            }).catch((err) => {
                let msg = err.response.data.message;
                console.log("error", err.response.data.message);
                this.setState({
                    message: 'User does not exist',
                    email: '',
                    password: '',
                });

            })



        }

    }
    render() {
        return (
            <div className='loginPage'>
                <Snackbar anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                    open={this.state.Error}
                    autoHideDuration={6000}
                    onClose={this.snackBarClose}
                    message={this.state.message}
                    action={
                        <IconButton
                            onClick={this.snackBarClose}>
                        </IconButton>
                    } />
                <AppBar >
                    <Toolbar>

                        <Typography variant="h4" className='title' >
                            Fundoo Note App
                            </Typography>
                        {/* <Button color="inherit" className="login-button">LogIn</Button> */}
                    </Toolbar>
                </AppBar>
                <Card className='loginCard'>
                    <div className="login-content">
                        <div className="login-h2"><h1>Login to your Account</h1></div>
                        <div className="display-box">
                            <div className='register-email'>
                               
                                <TextField
                                    className="email"
                                    required
                                    id="email"
                                    label="email"

                                    type="email"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}

                                />
                            </div>
                            <div className="register-password">
                                <TextField
                                    className="password"
                                    required
                                    id="password"
                                    label="password"

                                    type="password"
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}


                                />
                            </div>
                            <span style={{color: "#b71c1c" }}>{this.state.message}</span>
                            <div className="button">
                                <Button onClick={this.handleSubmit} color='primary' variant="contained" >
                                    submit
                    </Button>
                                {/* <div><a className="forgot-link" href="/forgotpassword"></a></div> */}
                                <small><Link className="register-link" href="/registration">Sign up</Link></small>
                                <small><Link className="forgot-link" href="/forgotpassword">Forgotten password?</Link></small>
                            </div>

                        </div>
                    </div>
                </Card>
            </div>);
    }
}
export default withRouter(Login);