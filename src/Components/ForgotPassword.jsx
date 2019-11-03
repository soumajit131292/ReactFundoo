import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';
import { emailVerify } from '../Controller/Usercontroller'

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: '',
            color:'',

        }
    }
    onChangeEmail = (event) => {
        var emailId = event.target.value;
        this.setState({
            email: emailId
        })
    }
    handleSubmit = () => {
        if (this.state.email === null) {
            this.setState({
                message: "email can't be null"
            })
        }


        else {
            var userEmailVerify = {

                "email": this.state.email,

            }
            console.log("login", userEmailVerify)
            emailVerify(userEmailVerify).then((res) => {
                console.log(res.data);
                
                this.setState({
                    message:'Please check your email to reset password',
                    email:'',
                    color:"#00ff00",
                })

            }).catch((err) => {
                let msg=err.response.data.message;
                console.log("error", err.response.data.message);
                this.setState({
                    message:'EmailId is not valid',

                        email:'',
                        color:"#b71c1c",
                    })
                });

            

            // this.props.history.push('/login')

        }

    }

    render() {
        return (
            <div className='forgot-password'>
                <AppBar >
                    <Toolbar>

                        <Typography variant="h4" className='title' >
                            Fundoo Note App
                            </Typography>
                        {/* <Button color="inherit" className="login-button">LogIn</Button> */}
                    </Toolbar>
                </AppBar>
                <div className="fp-div">
                <Card className='forgot-card'>
                    <div className='fp-head'>Find Your Account</div><br/>
                    <hr/>
                    <div>
                    {/* {this.state.color} */}
                        
                    </div>
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
                    <span style={{color:this.state.color}}>{this.state.message}</span>
                    <div className='register-submitButton'>
                    <div>
                        <Button onClick={this.handleSubmit} color='primary' variant="contained" className="button">
                            submit
                    </Button>
                    </div>
                   </div> 
                </Card>
                </div>
            </div >
        )
    }
}
export default withRouter(ForgotPassword);