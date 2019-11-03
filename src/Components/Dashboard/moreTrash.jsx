import React, { Component } from 'react';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import { Paper, Tooltip } from '@material-ui/core';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { withRouter } from 'react-router-dom';
import {trashNote} from '../../Controller/NoteController';
import { deletTrashedNotes } from '../../Controller/NoteController';
class MoreTrash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            closepaper: false
        }
    }
    handleForeverDelet=()=>{
        deletTrashedNotes(this.props.noteId).then((res)=>{
            console.log(res.data)
        })

    }

    restoreNote=()=>{
        trashNote(this.props.noteId).then((res)=>{
            console.log(res.data)
        })

    }
    handleMoreOpen = (e) => {
        console.log(this.props.noteId)
        this.setState({
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        })
    }
    render() {
        return (
            <div>
                <Tooltip title="More" >
                    <MoreVertOutlinedIcon onClick={(e) => this.handleMoreOpen(e)} onClickAway={this.closePaper} />
                </Tooltip>
                <Popper

                    open={this.state.anchorEl} anchorEl={this.state.anchorEl}
                >
                    <Paper>
                        <MenuItem onClick={this.restoreNote}>Restore</MenuItem>
                        <MenuItem onClick={this.handleForeverDelet}>Forever Delete</MenuItem>

                    </Paper>
                </Popper>

            </div>
        )
    }
}
export default withRouter(MoreTrash);