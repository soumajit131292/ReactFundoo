import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';
import { Usercontroller } from '../Controller/Usercontroller';
import { Snackbar, IconButton } from '@material-ui/core';


class Registration extends Component {

    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            mobileNumber: '',
            email: '',
            password: '',
            openSnackBar: '',
            Error: false,
            message: "",

        }
    }
    snackBarClose = () => {
        this.setState({
            Error: false
        })
    }
    onChangeFirstName = async (event) => {
        var firstname = event.target.value;
        this.setState({
            firstName: firstname,

        })

    }
    onChangeLastName = (event) => {
        var lastname = event.target.value;
        this.setState({
            lastName: lastname,

        })
    }

    onChangeEmail = (event) => {
        var emailId = event.target.value;
        this.setState({
            email: emailId,

        })

    }
    onChangePassword = (event) => {
        var userPassword = event.target.value;
        this.setState({
            password: userPassword,

        })

    }

    onChangeMobileNumber = (event) => {
        var userMobileNumber = event.target.value;
        this.setState({
            mobileNumber: userMobileNumber,

        })
    }
   


    handleSubmit = (event) => {
      
        if (this.state.firstName === "" || this.state.firstName.length < 4) {
            this.setState({
                Error: true,
                message: "firstName can't be null or should be greaterThan 4"
            })
        }

        else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
            this.setState({
                Error: true,
                message: 'Please provide a valid email address'
            })
        }
        else if (this.state.password === null || this.state.password.length < 8) {
            this.setState({
                Error: true,
                message: "Password length should be min 8"
            })
        }
        else {
            var userRegister = {
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "email": this.state.email,
                "mobileNumber": this.state.mobileNumber,
                "password": this.state.password,
            }
            console.log("register", userRegister)
            Usercontroller(userRegister).then(res => {
                console.log(res.data);
                this.setState({
                    Error: true,
                    message: 'User already registered!',
                    firstName: '',
                    lastName: '',
                    mobileNumber: '',
                    email: '',
                    password: '',
                });
                this.props.history.push('/registersuccess');
            }).catch((err) => {
                let msg = err.response.data.message;
                console.log("error", err.response.data.message);
                this.setState({
                    Error: true,
                    message: 'User already registered!',
                    firstName: '',
                    lastName: '',
                    mobileNumber: '',
                    email: '',
                    password: '',
                });

            })
        }



    }


    render() {
        return (


            <div className='registerPage'>
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


                <Card className="registerCard" style={{ width: "100%" }}>
                    <AppBar >
                        <Toolbar>

                            <Typography variant="h4" className='title' >
                                Fundoo Note App
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <div className="cardView">
                        <div className="register-h2"><h1>Create Account</h1></div>
                        <div className="dispaly-box">
                            <div className='register-names'>

                                <div className="field-pos">

                                    <TextField
                                        className="firstname"
                                        required
                                        id="firstname"
                                        label="First Name"

                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.firstName}
                                        onChange={this.onChangeFirstName}
                                        errorText={this.state.firstNameError}

                                    />

                                </div>


                                <div className="field-pos">
                                    <TextField
                                        className="lastname"

                                        id="lastname"
                                        label="Last Name"

                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.lastName}
                                        onChange={this.onChangeLastName}
                                    />
                                </div>

                                <div className="field-pos">

                                    <TextField
                                        className="moblenumber"
                                        required
                                        id="mobilenumber"
                                        label="Mobile number"

                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.mobileNumber}
                                        onChange={this.onChangeMobileNumber}
                                        errorText={this.state.mobileNumberError}

                                    />

                                </div>

                                <div className="field-pos">

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
                                        errorText={this.state.emailError}


                                    />

                                </div>

                                <div className="field-pos">

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
                                        errorText={this.state.passwordError}



                                    />

                                </div>

                                <div >
                                    <Button onClick={this.handleSubmit} color='primary' variant="contained">
                                        submit
                             </Button>
                                    {/* <Button class="cancel-button" onClick={this.cancelSubmit} color='primary' variant="contained">
                                    cancel
                             </Button> */}

                                </div>
                            </div>
                        </div>

                    </div>
                </Card>





            </div >

        );
    }

}
export default withRouter(Registration);
