import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { IconButton } from '@material-ui/core';


import { ClickAwayListener, Button, Dialog, DialogContent } from '@material-ui/core';
class Logout extends Component {
    constructor(props){
        super(props);
        this.state={
            openDialog : false,
        }
    }
    logout = () => {
        this.setState=({
            openDialog : !this.state.openDialog
        })

    }
    render() {
        return (
            <div>
                <IconButton>
                    <SettingsOutlinedIcon onClick={this.logout} />
                    
                </IconButton>
                <Dialog open={this.state.openDialog}>

                    </Dialog>

            </div>
        )
    }
}
export default withRouter(Logout)