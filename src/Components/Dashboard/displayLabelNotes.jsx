import React, { Component } from 'react';
import { NoteController } from '../../Controller/NoteController';
import { InputBase, Card, Tooltip, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import Dialog from '@material-ui/core/Dialog';
import { addLabelonNote } from '../../Controller/label';
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
import { getNotesByLabelName } from '../../Controller/label';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import DateTimePicker from 'react-datetime-picker';
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
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
class DisplayLabelNotes extends Component {
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
        }
    }

    componentDidMount() {

        this.getNotes()
    }
    getNotes = () => {
        // getNotesByLabelName(this.props.labelName).then((res) => {
        //     this.setState({
        //         notes: res.data.object
        //     })
        // })
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
        console.log('in display component', label)
        deleteLabel(label.id).then((res) => {
            this.getNotes()
            console.log(res.data)

        }).catch((err) => {
            console.log(err.data)
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
        }
    }
    change = (value) => {
        if (value === true)
            this.getNotes()
    }
    reloadNote = (value) => {
        if (value === true)
            this.getNotes()
    }
    archieveResponse = (value) => {
        if (value === true)
            this.getNotes()
    }
    colabAdd = (value) => {
        if (value === true)
            this.getNotes()
    }
    clobaDelete = (value) => {
        if (value === true)
            this.getNotes()
    }
    deleteResponse = (value) => {
        if (value === true)
            this.getNotes()
    }
    addLabelResponse = (value) => {
        if (value === true)
            this.getNotes()
    }


    render() {
        console.log(this.state.notes)
        const viewNote = !this.props.view ? "note-display" : "fullbox-display"
        const viewFooter = !this.props.view ? "note-display-footer" : "fullbox-display-footer"
        let getAllNotes = this.state.notes.map((keys) => {
            return <div key={keys.id}>
                <div>
                    {keys.note.labels.map((labela) => {
                        return (<div key={labela.id}>{labela.labelName === this.props.labelName ? < div key={keys.id} >
                            < Card key={keys.id} className={viewNote} style={{ backgroundColor: keys.note.colorCode }}>
                                <div onClick={() => { this.handleClickTakeNote(keys.note) }}>
                                    <CardContent>
                                        {keys.note.title}
                                    </CardContent>
                                    <CardContent>
                                        {keys.note.description}
                                    </CardContent>
                                    <CardContent>
                                    <div>{keys.note.remainder === null ? '' : <Chip label={keys.note.remainder} onDelete={() => this.deleteRemainder(keys.note)} onClick={(e) => { this.pickerOpen(e) }} variant="outlined" />}
                                    {keys.note.labels.map((labela) => {
                                        return (<div key={labela.id}>{labela === null ? '' :
                                            <Chip label={labela.labelName} onDelete={() => this.deleteLabel(labela)} variant="outlined" />}
                                        </div>);
                                    })}
                                    {keys.user.map((colab) => {
                                        return (<div key={colab.colabId}>{colab === null || colab.email=== localStorage.getItem('userEmail')? '' :
                                            <Chip label={colab.email} variant="outlined" />}
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
                                </div>
                                <CardActions className={viewFooter}>
                                <Remainder noteId={keys.note.id} updateNote={this.reloadNote} />
                                        <Collaborator noteId={keys.note} collaboratorAdd={this.colabAdd} collaboratorDelete={this.clobaDelete} />
                                        <Color noteId={keys.note.id} changed={this.change} />
                                        <Archive note={keys.note.id} archievedDoneResposne={this.archieveResponse} />
                                        <More noteId={keys.note.id} moreToAllNotes={this.deleteResponse} labelAdd={this.addLabelResponse} />
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
                                    <CardActions className={viewFooter}>
                                        <Remainder noteId={keys.note.id} updateNote={this.reloadNote} />
                                        <Collaborator noteId={keys.note} collaboratorAdd={this.colabAdd} collaboratorDelete={this.clobaDelete} />
                                        <Color noteId={keys.note.id} changed={this.change} />
                                        <Archive note={keys.note.id} archievedDoneResposne={this.archieveResponse} />
                                        <More noteId={keys.note.id} moreToAllNotes={this.deleteResponse} labelAdd={this.addLabelResponse} />
                                        <Button className="button-close" style={{ float: "right " }} onClick={this.closeDialog}>Close</Button>

                                    </CardActions>
                                </Card >
                            </Dialog>
                        </div > :
                            ''}
                        </div>);
                    })}
                </div>
            </div>
        });
        return (
            <div className="allNotePage">
                <MuiThemeProvider theme={themes}>
                    {getAllNotes}
                </MuiThemeProvider>
            </div >
        )
    }
}

export default withRouter(DisplayLabelNotes)