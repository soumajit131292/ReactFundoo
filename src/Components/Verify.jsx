import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';
import { userVerify } from '../Controller/Usercontroller'
class Verify extends Component {


    handleSubmit=()=>{
        const token = this.props.match.params.token;
        userVerify(token).then(res => {

            console.log(res.data);
            // if(res.status===200)
            this.props.history.push('/')
        })

    }

    render() {
        return (
            <div className='registerPage'>

            <AppBar >
                <Toolbar>

                    <Typography variant="h4" className='title' >
                        Fundoo Note App
                        </Typography>
                    
                </Toolbar>
            </AppBar>
            <div className="success-register">

            <h3><Button onClick={this.handleSubmit} color='primary' variant="contained" >
                            verify
                         </Button></h3>

            </div>

            </div>
        )
    }
}
export default withRouter(Verify);