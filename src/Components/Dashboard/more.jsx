import React, { Component } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import { Paper, Tooltip } from '@material-ui/core';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { trashNote } from '../../Controller/NoteController';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

export default class more extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItem: false,
            id: '',
            title: '',
            description: '',
            notes: [],
            openDialog: false,
            anchorEl: null,
            closepaper: false
        }
    }
    closePaper = () => {
        this.setState({
            closepaper: !this.state.closepaper
        })
    }
    handleMoreOpen = (e) => {
        console.log(this.props.noteId)
        this.setState({
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        })
    }
    handleDelet = () => {
        trashNote(this.props.noteId).then((res) => {
            console.log(res)
        })
    }
    handleClickCloseAway = () => {
        this.setState({
            anchorEl: !this.state.anchorEl
        })
    }
    render() {
        return (
            <div>
                <Tooltip title="More" >
                    <MoreVertOutlinedIcon onClick={(e) => this.handleMoreOpen(e)} onClickAway={this.closePaper}
                        style={{
                            zIndex: "9999", marginTop: "5px", position: "static"
                        }}
                    />
                </Tooltip>
                <Popper
                    open={this.state.anchorEl} anchorEl={this.state.anchorEl} >
                    <ClickAwayListener onClickAway={this.handleClickCloseAway}>
                        <Paper>
                            <MenuItem onClick={this.handleDelet}>Delete</MenuItem>
                            <MenuItem >Add Labels</MenuItem>
                        </Paper>
                    </ClickAwayListener>
                </Popper>
            </div>
        )
    }
}