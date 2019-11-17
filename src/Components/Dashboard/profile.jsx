import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tooltip, Avatar, Dialog, Paper, Popper } from '@material-ui/core';
import { Card, Button, Divider, MuiThemeProvider, createMuiTheme, ClickAwayListener } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            dialog: false,
            box: false
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
    render() {
        return (
            <div>
                <Tooltip title="profile" >
                    <Avatar alt="Remy Sharp" src={this.state.file} onClick={this.handleClick}>{localStorage.getItem('userEmail')}
                    </Avatar>
                </Tooltip>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{
                        zIndex: "99999999", marginTop: "5px", position: "static"
                    }}>
                    <ClickAwayListener onClickAway={this.closeDialog}>
                       <Paper>
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