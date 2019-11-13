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

    handleClickTakeNote = (note) => {
        console.log(note)
        this.setState({
            id: note.id,
            title: note.title,
            description: note.description,
            openDialog: !this.state.openDialog,
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
            console.log(res.data)
        })
    }
    handleCloseDialog=()=>{
        this.setState({
            openDialog : !this.state.openDialog,
        })
    }
    render() {
        let getAllNotes = this.state.notes.map((keys) => {
            return (
                < div key={keys.id} >
                    < Card key={keys.id} className="note-display" >
                        <div onClick={() => { this.handleClickTakeNote(keys.note) }}>
                            <CardContent>
                                {keys.note.title}
                            </CardContent>
                            <CardContent>
                                {keys.note.description}<br/>
                                {/* {keys.colab.map((item)=> {
                                    
                                    return (
                                    <Chip label=  {item.userEmailId} variant="outlined"/>
                                      );
                                    
                                })} */}
                                
                            </CardContent>
                        </div>
                        <CardActions  >
                            <IconButton style={{ padding: "0px" }} >
                                <More noteId={keys.note.id} />
                            </IconButton>

                            <Tooltip title="UnArchive">
                                <UnarchiveOutlinedIcon onClick={() => this.handleUnArchive(keys.note.id)} />
                            </Tooltip>
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
                                <Tooltip title="UnArchive">
                                    <UnarchiveOutlinedIcon onClick={() => this.handleUnArchive(keys.note.id)} />
                                </Tooltip>
                                <More noteId={keys.note.id} />
                                <Button className="button-close" onClick={this.closeDialog}>Close</Button>
                            </CardActions>
                        </Card >
                       
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