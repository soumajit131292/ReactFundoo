import React, { Component } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import { Paper, Tooltip } from '@material-ui/core';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { trashNote } from '../../Controller/NoteController';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { getAllLabels } from '../../Controller/NoteController';
import Checkbox from '@material-ui/core/Checkbox';
import Menu from '@material-ui/core/Menu';
import { addLabelonNote } from '../../Controller/label';
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
            closepaper: false,
            addLabelDialogBox: null,
            labelCompOpen: false,
            labels: [],
            noteiD: '',
        }
    }
    componentDidMount() {
        this.getLabels();
    }
    getLabels = () => {
        getAllLabels().then((response) => {
            console.log('data', response.data);
            this.setState({
                labels: response.data,
            })
        })
    }
    labelComp = () => {
        this.setState({
            labelCompOpen: !this.state.labelCompOpen,
        })
    }
    closePaper = () => {
        this.setState({
            closepaper: !this.state.closepaper
        })
    }
    handleMoreOpen = (e) => {
        console.log('abe', e)
        // console.log(this.props.noteId)
        this.setState({
            noteiD: e.target.value,
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        })
        console.log('ab', e)
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
    handleLabelOpen = (e) => {
        console.log(this.state.noteiD)
        this.setState({

            addLabelDialogBox: this.state.addLabelDialogBox ? !this.state.addLabelDialogBox : e.target
        })
    }
    handleClickCloseAwayLabel = () => {
        this.setState({
            addLabelDialogBox: !this.state.addLabelDialogBox
        })
    }
    saveLabel = (labelId) => {
        addLabelonNote(labelId, this.props.noteId).then((res) => {
            console.log(res.data)
        })
    }
    render() {
        let allLabel = this.state.labels.map((label) => {
            return (
                <div key={label.id}>


                    <Checkbox onClick={() => this.saveLabel(label.id)} />
                    {label.labelName}


                </div>
            )
        })
        return (
            <div>
                <Menu
                    open={this.state.addLabelDialogBox} anchorEl={this.state.addLabelDialogBox} style={{
                        zIndex: "999999", marginTop: "0px", position: "static"
                    }} >

                    <ClickAwayListener onClickAway={this.handleClickCloseAwayLabel}>
                        <Paper>

                            {allLabel}
                        </Paper>



                    </ClickAwayListener>

                </Menu>
                <Tooltip title="More" >
                    <MoreVertOutlinedIcon onClick={(e) => this.handleMoreOpen(e)} onClickAway={this.closePaper}
                        style={{
                            zIndex: "9999", marginTop: "5px", position: "static"
                        }}
                    />
                </Tooltip>
                <Menu
                    open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{
                        zIndex: "99999", marginTop: "5px", position: "static"
                    }} >
                    <ClickAwayListener onClickAway={this.handleClickCloseAway}>
                        <Paper>
                            <MenuItem onClick={this.handleDelet}>Delete</MenuItem>
                            <MenuItem onClick={(e) => this.handleLabelOpen(e)}>Add Label</MenuItem>

                        </Paper>
                    </ClickAwayListener>
                </Menu>
            </div>
        )
    }
}