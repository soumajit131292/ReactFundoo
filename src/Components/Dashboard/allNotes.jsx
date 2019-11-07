import React, { Component } from 'react';
import { NoteController } from '../../Controller/NoteController';
import { InputBase, Card, Tooltip, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { updateNote } from '../../Controller/NoteController';
import More from './more';
import Collaborator from '../Dashboard/collaborator';
import { AppBar, Toolbar, IconButton, ClickAwayListener } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

import Archive from '../Dashboard/archive';

const themes = createMuiTheme({
    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: "8px",
                margin:"10px" 
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
export default class allNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItem: false,
            id: '',
            title: '',
            description: '',
            notes: [],
            openDialog: false,
            colabs:[],
        }

    }
    componentDidMount() {
        this.getNotes();
    }
    getNotes = () => {
        NoteController().then((res) => {
            console.log("in getNotes ", res.data);
            this.setState({
                notes: res.data,
            })
            console.log('data', this.state.notes)
            console.log('colab', this.state.colabs)
        }
        )
    }
    updateCard=(note)=>{
        console.log("new note",note);
        
        var updatedNotes=[...this.state.notes,note];
        this.setState({
            notes:updatedNotes
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
            // updateNote(editedNote, this.state.id).then((res) => {
            //     console.log(res.data);
            // })
        }
    }

    render() {
        let getAllNotes = this.state.notes.map((keys) => {
            return (
                < div key={keys.id} >
                    < Card key={keys.id} className="note-display" >
                        <div onClick={() => { this.handleClickTakeNote(keys) }}>
                            <CardContent>
                                {keys.title}
                            </CardContent>
                            <CardContent>
                                {keys.description}<br/>
                                {keys.colab.map((item) =>{
                                    
                                    return ( <div key={item.colabId}>{item === null? '':
                                    <Chip  label=  {item.userEmailId} variant="outlined"/>}
                                    </div> );
                                    
                                })}
                                
                            </CardContent>
                        </div>
                        <CardActions  >
                            <Collaborator noteId={keys}/>
                            <Archive note={keys.id}/>
                            <More noteId={keys.id} />
                        </CardActions>
                    </Card >
                    <Dialog open={this.state.openDialog} >
                        < Card className="note-dialog" style={{ boxShadow: "1px 1px 1px 1px"}} >
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
                            <Collaborator noteId={keys}/>
                            
                                
                            
                            <Archive note={keys.id}/>
                                <More noteId={keys.id} />
                                <Button className="button-close" style={{float: "right "} } onClick={this.closeDialog}>Close</Button>
                            </CardActions>
                        </Card >
                    </Dialog>
                </div >
            )
        })
        return (
            <div className="allNotePage">
                <MuiThemeProvider theme={themes}>
                    {getAllNotes}
                </MuiThemeProvider>
            </div >
        )
    }
}