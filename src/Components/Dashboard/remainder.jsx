import React, { Component } from 'react';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import { withRouter } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
 class Remainder extends Component {
    render() {
        return (
            <div>
                <Tooltip title="Remind me" >
                <AddAlertOutlinedIcon />
                </Tooltip>
            </div>
        )
    }
}
export default withRouter(Remainder)