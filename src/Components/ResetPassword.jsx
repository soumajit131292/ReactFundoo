import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';
import { userPasswordReset } from '../Controller/Usercontroller'

class ResetPassword extends Component {

    constructor() {
        super();
        this.state = {
message:'',
            password: ''
        }
    }

    onChangePassword = (event) => {
        var password = event.target.value;
        this.setState({
            password: password
        })
        console.log('aa', password)
    }
    handleSubmit = () => {
        if (this.state.password === null || this.state.password.length < 8) {
            this.setState({

                message: "Password length should be min 8"
            })
        }

        else {
            const token = this.props.match.params.token;
            console.log('6666666----', this.props);

            const userPassword = {


                "password": this.state.password,
            }
            console.log("token", token);
            console.log("login", userPassword)
            userPasswordReset(userPassword, token).then(res => {
                console.log(res.data);
                this.setState({
                    password:'',
                })
                this.props.history.push('/')
            })

            // this.props.history.push('/login')

        }

    }


    render() {
        return (
            <div className='resetPage'>
                <AppBar >
                    <Toolbar>

                        <Typography variant="h4" className='title' >
                            Fundoo Note App
                        </Typography>
                        {/* <Button color="inherit" className="login-button">LogIn</Button> */}
                    </Toolbar>
                </AppBar>
                <Card className='resetCard'>
                    <div className="reset-h2"><h3>Enter password</h3></div>

                    <div class="password-field">
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
                    <span className="view" style={{color: "#b71c1c" }}>{this.state.message}</span>


                    <div class="reset-button">
                        <Button onClick={this.handleSubmit} color='primary' variant="contained" className="button">
                            submit
                        </Button>
                    </div>
                </Card>

            </div >
        )
    }
}
export default withRouter(ResetPassword);