import React, { Component } from 'react';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import { Paper, Tooltip ,ClickAwayListener} from '@material-ui/core';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { withRouter } from 'react-router-dom';
import {trashNote} from '../../Controller/NoteController';
import { deletTrashedNotes } from '../../Controller/NoteController';
class MoreTrash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            closepaper: false,
            deleteResponse : false
        }
    }
    handleForeverDelet=()=>{
        deletTrashedNotes(this.props.noteId).then((res)=>{
            console.log(res.data)
            this.setState({
                deleteResponse : !this.state.deleteResponse
            })
            console.log(this.state.deleteResponse)
            this.props.moreTrashToDeleteNote(this.state.deleteResponse)
        })
    }
    restoreNote=()=>{
        trashNote(this.props.noteId).then((res)=>{
            this.setState({
                deleteResponse : !this.state.deleteResponse
            })
            console.log(this.state.deleteResponse)
            this.props.moreTrashToDeleteNote(this.state.deleteResponse)
        })
    }
    handleMoreOpen = (e) => {
        console.log(this.props.noteId)
        this.setState({
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        })
    }
    handleClickCloseAway=()=>{
        this.setState({
            anchorEl : !this.state.anchorEl
        })
    }
    render() {
        return (
            <div>
                <Tooltip title="More" >
                    <MoreVertOutlinedIcon onClick={(e) => this.handleMoreOpen(e)} onClickAway={this.closePaper} />
                </Tooltip>
                <Popper
                    open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{
                        zIndex: "99999", marginTop: "5px", position: "static"
                    }} 
                >
                    <ClickAwayListener onClickAway={this.handleClickCloseAway}>
                    <Paper>
                        <MenuItem onClick={this.restoreNote}>Restore</MenuItem>
                        <MenuItem onClick={this.handleForeverDelet}>Forever Delete</MenuItem>
                    </Paper>
                    </ClickAwayListener>
                </Popper>
            </div>
        )
    }
}
export default withRouter(MoreTrash);