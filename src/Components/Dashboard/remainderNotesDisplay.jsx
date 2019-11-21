import React, { Component } from 'react'
import { NoteController } from '../../Controller/NoteController';
import { InputBase, Card, Tooltip, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import DateTimePicker from 'react-datetime-picker';
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import Dialog from '@material-ui/core/Dialog';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { deleteLabel } from '../../Controller/label';
import More from './more';
import Collaborator from '../Dashboard/collaborator';
import { AppBar, Toolbar, IconButton, ClickAwayListener } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Remainder from '../Dashboard/remainder';
import Archive from '../Dashboard/archive';
import { updateNote, deleteRemainder } from '../../Controller/NoteController';
import { setRemainder } from '../../Controller/NoteController';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PinUnpin from '../../Components/Dashboard/pinUnpin';
import UnPin from '../Dashboard/unPin';
import Color from '../Dashboard/color';


const themes = createMuiTheme({
    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: "8px",
                margin: "10px"
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

class RemainderNotesDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItem: false,
            id: '',
            title: '',
            description: '',
            notes: [],
            openDialog: false,
            colabs: [],
            anchorEl: null,
            selectedDate: new Date(),
        }
        console.log(this.props.view)
    }
    componentDidMount() {
        this.getNotes();
    }
    getNotes = () => {
        NoteController().then((res) => {
            console.log("in getNotes ", res.data);
            this.setState({
                notes: res.data.object,
            })
            console.log('data', this.state.notes)
            console.log('colab', this.state.colabs)
        }
        )
    }
    updateCard = (note) => {
        console.log("new note", note);

        var updatedNotes = [...this.state.notes, note];
        this.setState({
            notes: updatedNotes
        })
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
    handleClickTakeNote = (note) => {
        console.log(note)
        this.setState({
            id: note.id,
            title: note.title,
            description: note.description,
            openDialog: !this.state.openDialog,
        })
    }
    deleteLabel = (label) => {
        console.log(label)
        deleteLabel(label.id).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err.data)
        })
    }
    pickerOpen = (e) => {
        this.setState({
            openDialog: this.state.openDialog,
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        })
    }
    closeDialog = () => {
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
                this.getNotes()
                console.log(res.data);
            })
        }
    }
    deleteRemainder = (keys) => {
        deleteRemainder(keys.id).then((res) => {
            this.getNotes()
            console.log(res.data);
        })
    }
    handleChangeDate = (data) => {
        this.setState({
            selectedDate: data
        })
        console.log('noteId in remainder', this.props.noteId);
        console.log('data', this.state.selectedDate)
        setRemainder(data, this.props.noteId).then((res) => {
            this.getNotes()
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    pin=(value)=>{
        if(value === true)
        this.getNotes()
    }
    unpin=(value)=>{
        if(value === true)
        this.getNotes()

    }
    render() {
        const viewNote = !this.props.view ? "note-display" : "fullbox-display"
        const viewFooter = !this.props.view ? "note-display-footer" : "fullbox-display-footer"
        let getAllNotes = this.state.notes.map((keys) => {
            return (
               ( keys === null ||  keys.note.remainder === null)? '' :
                    < div key={keys.id} >
                        < Card key={keys.id} className={viewNote} style={{ backgroundColor: keys.note.colorCode }} >  
                        { keys.note.pinned === true? <UnPin noteId={keys.note.id} Unpin={this.pin}/> : <PinUnpin noteId={keys.note.id} pinUnpin={this.unpin}/>}                   
                            <div onClick={() => { this.handleClickTakeNote(keys.note) }}>
                                <CardContent>
                                    {keys.note.title}                        
                                     { keys.note.isPinned }                                        
                                          {keys.user.map((colab) => {
                                                return (<div key={colab.colabId}>{colab === null ? '' :
                                                    <Chip label={colab.email} variant="outlined" />}
                                                </div>);
                                            })}                                     
                                </CardContent>
                                <CardContent>
                                    {keys.note.description}
                                </CardContent>
                            </div>
                            <CardContent>
                                <div>{keys.note.remainder === null ? '' : <Chip label={keys.note.remainder} onDelete={() => this.deleteRemainder(keys.note)} onClick={(e) => {this.pickerOpen(e)}} variant="outlined" />}
                                    {keys.note.labels.map((labela) => {
                                        return (<div key={labela.id}>{labela === null ? '' :
                                            <Chip label={labela.labelName} onDelete={() => this.deleteLabel(labela)} variant="outlined" />}
                                        </div>);
                                    })}
                                </div>
                                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl}
                                    style={{ marginTop: "5px", zIndex: "9999" }}>
                                    <ClickAwayListener onClickAway={this.handleClickAway}>
                                        <Paper className="reminder-paper">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                                <DateTimePicker style={{ padding: "5px", width: "175px" }}
                                                    value={this.state.selectedDate}
                                                    onChange={this.handleChangeDate}
                                                >
                                                </DateTimePicker>
                                            </MuiPickersUtilsProvider>
                                        </Paper>
                                    </ClickAwayListener>
                                </Popper>
                            </CardContent>                           
                        <div>
                        </div>
                        <CardActions className={viewFooter}>                       
                            <Remainder noteId={keys.note.id} />
                            <Collaborator noteId={keys.note} />
                            <Color noteId={keys.note.id} />
                            <Archive note={keys.note.id} />
                            <More noteId={keys.note.id} />
                        </CardActions>
                        </Card >
                    <Dialog open={this.state.openDialog} >
                        < Card className="note-dialog" style={{ boxShadow: "1px 1px 1px 1px" }} >
                            <CardContent>
                                <TextField
                                    type="text"
                                    multiline
                                    value={this.state.title}
                                    onChange={this.handleTitleChange}
                                /></CardContent>
                            <CardContent>
                                <TextField
                                    type="text"
                                    multiline
                                    value={this.state.description}
                                    onChange={this.handleDescription}
                                /></CardContent>
                            <CardActions>
                                <Remainder />
                                <Collaborator noteId={keys.note} />
                                <Color noteId={keys.note.id} />
                                <Archive note={keys.note.id} />
                                <More noteId={keys.note.id} />
                                <Button className="button-close" style={{ float: "right " }} onClick={this.closeDialog}>Close</Button>
                            </CardActions>
                        </Card >
                    </Dialog>
                    </div >

            )
    })


    
    return(
            <div className = "allNotePage" >
            <MuiThemeProvider theme={themes}>
                {getAllNotes}
            </MuiThemeProvider>
            </div >
        )
    }
    }

export default withRouter(RemainderNotesDisplay)