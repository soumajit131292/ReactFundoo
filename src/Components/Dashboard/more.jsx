import React, { Component } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import { Paper, Tooltip, TextField } from '@material-ui/core';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import { trashNote } from '../../Controller/NoteController';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import { getAllLabels } from '../../Controller/NoteController';
import Checkbox from '@material-ui/core/Checkbox';
import Menu from '@material-ui/core/Menu';
import { addLabelonNote } from '../../Controller/label';
import { createLabelOnNote } from '../../Controller/label';
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
            opacity: 1,
            title: '',
            deleteNOte: false,
            addLabel : false
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

            this.setState({
                anchorEl: !this.state.anchorEl ,
                deleteNOte: !this.state.deleteNOte
            })
            this.props.moreToAllNotes(this.state.deleteNOte)


            console.log(res)
        })
    }
    handleClickCloseAway = () => {
        this.setState({
            anchorEl: !this.state.anchorEl
        })
    }
    handleLabelOpen = (e) => {
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
        console.log('noteId', this.props.noteId)
        console.log('labelId------>', labelId)
        addLabelonNote(labelId, this.props.noteId).then((res) => {
            this.setState({
                addLabel : !this.state.addLabel,
            })
           
            this.props.labelAdd(this.state.addLabel)
            console.log(res.data)
        })
    }
    mouseEnter = () => {
        this.setState({
            opacity: 0
        })
    }
    handleTitleChange = (event) => {
        this.setState({
            labelName: event.target.value
        })
    }
    handleUpdateLabel = () => {
     
        if (this.state.labelName === '' || this.state.detectChange === false) {
            this.props.data.changeLabelDialog(false)
        }

        else {
            this.setState({
                labelName: this.state.labelName
            })
            var label = {
                'labelName': this.state.labelName
            }
            console.log(this.state.labelName)
            console.log(this.props.noteId)
            createLabelOnNote(this.props.noteId, label).then((res) => {
                this.setState({
                    addLabel : !this.state.addLabel,
                })
               
                this.props.labelAdd(this.state.addLabel)
                console.log(res.data)
            })

        }
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
                <Popper
                    open={this.state.addLabelDialogBox} anchorEl={this.state.addLabelDialogBox} style={{
                        zIndex: "99999999", marginTop: "0px", position: "static"
                    }} >

                    <ClickAwayListener onClickAway={this.handleClickCloseAwayLabel}>
                        <Paper>
                            <TextField
                                type="text"
                                multiline
                                value={this.state.labelName}
                                onChange={this.handleTitleChange}
                                className="text-field"

                            />
                            <AddCircleOutlinedIcon onClick={this.handleUpdateLabel} />
                            {allLabel}
                            </Paper>
                            </ClickAwayListener>
                        </Popper>

                   

               
                <Tooltip title="More" >
                    <MoreVertOutlinedIcon  onClick={(e) => this.handleMoreOpen(e)} 
                        style={{
                            zIndex: "999999", marginTop: "5px", position: "static"
                        }}
                    />
                </Tooltip>
                <Popper
                    open={this.state.anchorEl} anchorEl={this.state.anchorEl} style={{
                        zIndex: "99999999", marginTop: "5px", position: "static"
                    }} >
                    <ClickAwayListener onClickAway={this.handleClickCloseAway}>
                        <Paper>
                            <MenuItem onClick={this.handleDelet}>Delete</MenuItem>
                            <MenuItem onClick={(e) => this.handleLabelOpen(e)}>Add Label</MenuItem>

                        </Paper>
                    </ClickAwayListener>
                </Popper>
            </div>
        )
    }
}