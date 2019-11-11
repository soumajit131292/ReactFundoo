import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { ClickAwayListener } from '@material-ui/core';
import { getLoggedUser } from '../../Controller/Usercontroller';
import Button from '@material-ui/core/Button';
import { InputBase, Card, Tooltip, TextField, Snackbar, IconButton } from '@material-ui/core';
import { collaboratorAdd } from '../../Controller/colabController';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import Chip from '@material-ui/core/Chip';

class Collaborator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            firstName: '',
            lastName: '',
            email: '',
            view: false,
            emailId: '',
            id: '',
            openSnackBar: '',
            Error: false,
            message: "",
            chipOpen: false,
        }
    }

    dialogOpenClose = () => {
        this.setState({
            open: !this.state.open,

        })
    }
    closeDialogfromAway = () => {
        this.setState({
            open: !this.state.open
        })
    }

    componentDidMount() {
        this.getUser()
    }
    getUser = () => {
        getLoggedUser().then((res) => {
            this.setState({
                firstName: res.data.firstName,
                id: res.data.id,
                lastName: res.data.lastName,
                email: res.data.email,
            })

        })

    }
    dialogReset = () => {
        this.setState({
            view: !this.state.view,
            open: !this.state.open
        })
    }
    snackBarClose = () => {
        this.setState({
            Error: false
        })
    }
    onChangeEmailId = (event) => {
        this.setState({

            emailId: event.target.value
        })
    }
    showIcon = () => {
        this.setState({
            view: !this.state.view
        })
    }
    saveColab = () => {
        if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.emailId)) {
            this.setState({

                Error: true,
                message: 'Please provide a valid email address'
            })
        }
        let colabBody = {
            "emailId": this.state.emailId,
           
        }
        collaboratorAdd(this.state.emailId, this.props.noteId.id).then((res) => {
            console.log(res.data);
            this.setState({
                chipOpen: !this.state.open
            })

        }).catch((res) => {
            this.setState({
                Error: true,
                message: res.response.data.message,
                open: !this.state.open,
                view: !this.state.view
            })
        })

    }


    render() {
        return (
            <div >
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
                <Tooltip title="Collaborator">
                    <PersonAddOutlinedIcon onClick={this.dialogOpenClose} />
                </Tooltip>


                <Dialog open={this.state.open} style={{ boxShadow: "1px 1px 1px 1px" }} >

                    <DialogTitle >
                        Collaborators
                    </DialogTitle>

                    <DialogContent dividers >
                        {this.state.firstName} {this.state.lastName} (Owner)<br />
                        {this.state.email}
                        {!this.state.chipOpen ? null : <Chip label={this.state.emailId} />}<br />
                        {/* {this.props.noteId.colab.map(function (item) {

                            return (
                                <Chip label={item.userEmailId} variant="outlined" />
                            );

                        })}<br /> */}
                        <div>
                        {!this.state.view ?
                            <InputBase
                                placeholder="add person"
                                onClick={this.showIcon}
                            /> :
                            <InputBase
                                type="email"
                                placeholder="add person"
                                value={this.state.emailId}
                                onChange={this.onChangeEmailId}
                            />}
                        {!this.state.view ? null : <DoneOutlinedIcon onClick={this.saveColab} />}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.dialogReset} >
                            Cancel
                         </Button>
                        <Button onClick={this.saveColab} >
                            Save
                        </Button>
                    </DialogActions>

                </Dialog>

            </div>
        )
    }
}
export default withRouter(Collaborator);