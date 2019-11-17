import React, { Component } from 'react';
import { archive } from './archive';
import more from './more';
import { Card, InputBase, Button, ClickAwayListener, Tooltip, Chip, CardActions } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createNote } from '../../Controller/NoteController';
import Archive from '../Dashboard/archive';
import { updateNote, deleteRemainder } from '../../Controller/NoteController';
import { setRemainder } from '../../Controller/NoteController';
import Remainder from '../Dashboard/remainder';
import Collaborator from '../Dashboard/collaborator';
import Color from '../Dashboard/color';
import More from './more';
class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            windowOpen: false,
            noteCreated: false,
        }
    }
    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value,
        })
    }
    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value,
        })
    }
    handleClick = () => {
        this.setState({
            windowOpen: !this.state.windowOpen,

        })
    }
    handleClickClose = () => {
        // console.log(this.state.title)
        // console.log(this.state.description)
        if (this.state.title === "" && this.state.description === "") {
            return this.setState({
                windowOpen: !this.state.windowOpen,
            })
        }
        else {
            this.setState({
                title: '',
                description: '',
                windowOpen: !this.state.windowOpen,

            })
            let note = {
                title: this.state.title,
                description: this.state.description,
            }
            console.log("yes");
            // this.props.noteToDashboard(note);
            createNote(note).then((response) => {
                console.log(response.data)
                this.setState({
                    noteCreated: !this.state.noteCreated
                })
                this.props.createnote(true)
            }).catch((err) => {
                console.log('err', err.response.data.message)
            });
        }
    }
    change = (value) => {
        if (value === true)
            this.getNotes()
    }
    reloadNote=(value)=>{
        if(value === true)
        this.getNotes()
    }
    archieveResponse=(value)=>{
        if(value === true)
        this.getNotes()
    }
    colabAdd=(value)=>{
        if(value===true)
        this.getNotes()
    }
    clobaDelete=(value)=>{
        if(value===true)
        this.getNotes()
    }
    deleteResponse=(value)=>{
        if(value===true)
        this.getNotes()
    }
    addLabelResponse=(value)=>{
        if(value===true)
        this.getNotes()
    }
    render() {
        return (
            <div className="note-comp" >


                {!this.state.windowOpen ? (
                    <Card className="notecard">
                        <InputBase
                            multiline type="text" style={{ width: "100%" }} placeholder="Take a note...." onClick={this.handleClick}
                        />

                    </Card>
                ) : (<Card className="noteTake" style={{ backgroundColor: this.state.color }}>
                    <InputBase style={{ width: "100%", padding: "10px" }}
                        multiline
                        type="text" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange}
                    />
                    <InputBase style={{ width: "100%", padding: "10px" }} type="text" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionChange}
                    />
                    <CardActions>
                        {/* <Remainder noteId={keys.note.id} updateNote={this.reloadNote} />
                        <Collaborator noteId={keys.note} collaboratorAdd={this.colabAdd} collaboratorDelete={this.clobaDelete} />
                        <Color noteId={keys.note.id} changed={this.change} />
                        <Archive note={keys.note.id} archievedDoneResposne={this.archieveResponse} />
                        <More noteId={keys.note.id} moreToAllNotes={this.deleteResponse} labelAdd={this.addLabelResponse} /> */}
                    </CardActions>
                    <Button style={{ paddingTop: "0%", float: "right" }} onClick={this.handleClickClose}>Close</Button>

                </Card>)}

            </div>
        )
    }
}
export default withRouter(Note);