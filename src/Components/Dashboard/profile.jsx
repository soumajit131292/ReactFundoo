import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tooltip, Avatar, Dialog, Paper, Popper } from '@material-ui/core';
import { Card, Button, Divider, MuiThemeProvider, createMuiTheme, ClickAwayListener } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { uploadPic } from '../../Controller/Usercontroller';
class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: false,
            dialog: false,
            box: false,
            image: false
        }
    }
    handleSignOut = () => {
        localStorage.removeItem('token')
        this.props.history.push('/')
    }
    handleAccount = () => {
        this.setState({
            dialog: !this.state.dialog,
            anchorEl: !this.state.anchorEl
        })
    }
    handleClick = (e) => {
        this.setState({
            dialog: !this.state.dialog,
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        })
    }
    closeDialog = () => {
        this.setState({
            anchorEl: !this.state.anchorEl
        })
    }
    pickImage = (event) => {
        console.log('in pickimage', event.target.files[0])
        const formData = new FormData();
        console.log('in profile',this.state.file)
        formData.append('pic',event.target.files[0])
        console.log('formdata',formData.get('pic'))
        uploadPic(formData).then((res)=>{
            console.log('data',res.data)

        })
    }
    
    render() {
        // let image=localStorage.getItem('profilePic')
        //console.log('pic',localStorage.getItem('profilePic'))
        //src={localStorage.getItem('profilePic')}
        console.log(localStorage.getItem('name'))
        return (
            <div>
                <Tooltip title={localStorage.getItem('name')} >
                    { localStorage.getItem('profilePic') === null ?  localStorage.getItem('name').substring(0,1) : <Avatar alt="Remy Sharp"  src={localStorage.getItem('profilePic')} onClick={this.handleClick} >
                       {localStorage.getItem('name').substring(0,1)}
                    </Avatar> }
                    
                    
                </Tooltip>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{
                        zIndex: "99999999", marginTop: "5px", position: "static"
                    }}>
                    <ClickAwayListener onClickAway={this.closeDialog}>
                       <Paper>
                       <input
                            multiple
                            type='file' id='file'
                            onChange={this.pickImage}  />
                            <MenuItem variant="contained" onClick={this.handleAccount}>No thanks</MenuItem>
                            <MenuItem variant="contained" onClick={this.handleSignOut}>Sign out</MenuItem>
                        </Paper>
                    </ClickAwayListener>
                </Popper>
            </div >
        )
    }
}
export default withRouter(Profile)