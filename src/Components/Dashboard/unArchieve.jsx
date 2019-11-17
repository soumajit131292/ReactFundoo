import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import { getArchivedNotes } from '../../Controller/NoteController';
import { InputBase, Card, Tooltip, TextField } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { updateNote } from '../../Controller/NoteController';
import More from './more';
import Popper from '@material-ui/core/Popper';
import { AppBar, Toolbar, IconButton, ClickAwayListener } from '@material-ui/core';
import { archiveNote } from '../../Controller/NoteController';
import CardHeader from '@material-ui/core/CardHeader';
import Archive from '../Dashboard/archive';
import Color from '../Dashboard/color';
import Collaborator from '../Dashboard/collaborator';
import Remainder from '../Dashboard/remainder';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const themes = createMuiTheme({
    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: "8px",
                margin: "10px",

            },
            elevation24: {
                boxShadow: "none"
            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: "rgba(15,15,15,0.25)"
            }
        }
    }
})
class UnArchieve extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuItem: false,
            id: '',
            title: '',
            description: '',
            notes: [],
            openDialog: false,
            anchorEl: null,
        }
    }
    componentDidMount() {
        this.getArchiveNotes();
    }
    getArchiveNotes = () => {
        getArchivedNotes().then((res) => {
            console.log("in getNotes ", res.data);
            this.setState({
                notes: res.data.object,
            })
            console.log('data', this.state.notes)
        }
        )
    }
    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    handleDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleClickTakeNote = (note, e) => {
        console.log(note)
        this.setState({
            id: note.id,
            title: note.title,
            description: note.description,
            openDialog: !this.state.openDialog,
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        })
    }

    closeDialog = async () => {
        if (this.state.title === "" && this.state.description === "")
            return this.setState({ openDialog: !this.state.openDialog })
        else {
            var editedNote = {
                "title": this.state.title,
                "description": this.state.description,

            }
            console.log('noteed', editedNote)

            this.setState({

                openDialog: !this.state.openDialog,
            })
            updateNote(editedNote, this.state.id).then((res) => {
                this.getArchiveNotes();
                console.log(res.data);
            })
        }
    }
    handleUnArchive = (noteId) => {

        console.log(noteId)
        archiveNote(noteId).then((res) => {
            this.getArchiveNotes();
            console.log(res.data)
        })
    }
    handleCloseDialog = () => {
        this.setState({
            openDialog: !this.state.openDialog,
        })
    }
    change = (value) => {
        if (value === true)
        this.getArchiveNotes();
    }
    reloadNote=(value)=>{
        if(value === true)
        this.getArchiveNotes();
    }
    archieveResponse=(value)=>{
        if(value === true)
        this.getArchiveNotes();
    }
    colabAdd=(value)=>{
        if(value===true)
        this.getArchiveNotes();
    }
    clobaDelete=(value)=>{
        if(value===true)
        this.getArchiveNotes();
    }
    deleteResponse=(value)=>{
        if(value===true)
        this.getArchiveNotes();
    }
    addLabelResponse=(value)=>{
        if(value===true)
        this.getArchiveNotes();
    }
    render() {
        const viewNote = !this.props.view ? "note-display" : "fullbox-display"
        const viewFooter = !this.props.view ? "note-display-footer" : "fullbox-display-footer"
        let getAllNotes = this.state.notes.map((keys) => {
            return (
                < div key={keys.id} >
                    < Card key={keys.id} className={viewNote} style={{ backgroundColor: keys.note.colorCode }}>
                        <div onClick={(e) => { this.handleClickTakeNote(keys.note, e) }}>
                            <CardContent>
                                {keys.note.title}
                            </CardContent>
                            <CardContent>
                                {keys.note.description}<br />
                            </CardContent>
                            <CardContent>
                                <div>{keys.note.remainder === null ? '' : <Chip label={keys.note.remainder} onDelete={() => this.deleteRemainder(keys.note)} onClick={(e) => { this.pickerOpen(e) }} variant="outlined" />}
                                    {keys.note.labels.map((labela) => {
                                        return (<div key={labela.id}>{labela === null ? '' :
                                            <Chip label={labela.labelName} onDelete={() => this.deleteLabel(labela)} variant="outlined" />}
                                        </div>);
                                    })}
                                    {keys.user.map((colab) => {

                                        return (<div key={colab.colabId}>{colab === null ? '' :
                                            <Chip label={colab.email} variant="outlined" />}
                                        </div>);

                                    })}
                                </div>

                            </CardContent>
                        </div>
                        <CardActions className={viewFooter}>
                            <Remainder noteId={keys.note.id} updateNote={this.reloadNote} />
                            <Collaborator noteId={keys.note} collaboratorAdd={this.colabAdd} collaboratorDelete={this.clobaDelete} />
                            <Color noteId={keys.note.id} changed={this.change} />
                            <Tooltip title="UnArchive">
                                <UnarchiveOutlinedIcon onClick={() => this.handleUnArchive(keys.note.id)} />
                            </Tooltip>
                            {/* <Archive note={keys.note.id} archievedDoneResposne={this.archieveResponse} /> */}
                            <More noteId={keys.note.id} moreToAllNotes={this.deleteResponse} labelAdd={this.addLabelResponse} />
                            {/* <Remainder noteId={keys.note.id} />
                            <Collaborator noteId={keys.note} />
                            <Color noteId={keys.note.id} />
                            <Tooltip title="UnArchive">
                                <UnarchiveOutlinedIcon onClick={() => this.handleUnArchive(keys.note.id)} />
                            </Tooltip>
                            <More noteId={keys.note.id} /> */}
                        </CardActions>


                    </Card >

                    <Dialog open={this.state.openDialog} >

                        {/* < Card className="note-dialog" style={{ boxShadow: "1px 1px 1px 1px" }} > */}

                        <DialogContent>
                            <TextField
                                type="text"
                                multiline
                                value={this.state.title}
                                onChange={this.handleTitleChange}
                            /></DialogContent>
                        <DialogContent>
                            <TextField
                                type="text"
                                multiline
                                value={this.state.description}
                                onChange={this.handleDescription}
                            /></DialogContent>

                        <DialogActions>
                        <Remainder noteId={keys.note.id} updateNote={this.reloadNote} />
                            <Collaborator noteId={keys.note} collaboratorAdd={this.colabAdd} collaboratorDelete={this.clobaDelete} />
                            <Color noteId={keys.note.id} changed={this.change} />
                            {/* <Archive note={keys.note.id} archievedDoneResposne={this.archieveResponse} /> */}
                           
                            <Tooltip title="UnArchive">
                                <UnarchiveOutlinedIcon onClick={() => this.handleUnArchive(keys.note.id)} />
                            </Tooltip>
                            <More noteId={keys.note.id} moreToAllNotes={this.deleteResponse} labelAdd={this.addLabelResponse}/>
                            <Button className="button-close" onClick={this.closeDialog}>Close</Button>
                        </DialogActions>
                        {/* </Card > */}

                    </Dialog>

                </div >
            )
        })
        return (
            <div className="allUnThrashNotePage">
                <MuiThemeProvider theme={themes}>
                    {getAllNotes}
                </MuiThemeProvider>
            </div >
        )
    }


}
export default withRouter(UnArchieve)