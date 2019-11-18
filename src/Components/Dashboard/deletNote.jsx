import React, { Component } from 'react';
import { getTrashedNotes } from '../../Controller/NoteController';
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
import { AppBar, Toolbar, IconButton, ClickAwayListener } from '@material-ui/core';
import MoreTrash from '../Dashboard/moreTrash';
import Chip from '@material-ui/core/Chip';
import PinUnpin from '../../Components/Dashboard/pinUnpin';
import UnPin from '../Dashboard/unPin';
const themes = createMuiTheme({
    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: "16px"
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
class DeletNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
        }
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
    componentDidMount() {
        this.getDeletedNote()
    }
    getDeletedNote = () => {
        getTrashedNotes().then((res) => {
            console.log(res.data)
            this.setState({
                notes: res.data
            })
           
        }).catch((err) => {
            console.log('delete notes err', err);
        })
    }
    deleteNote=(value)=>{
        console.log(this.props.moreTrashToDeleteNote)
        if(value===true)
        this.getDeletedNote()
    }
    
    render() {
        let getAllNote = this.state.notes.map((keys) => {
            return (
                < div key={keys.id} >
                    < Card key={keys.id} className="note-display" style={{ backgroundColor: keys.colorCode }}>
                    {/* {keys.note.pinned === true ? <UnPin noteId={keys.note.id} /> : <PinUnpin noteId={keys.note.id} />} */}
                        <div onClick={() => { this.handleClickTakeNote(keys) }}>
                            <CardContent>
                                {keys.title}
                            </CardContent>
                            <CardContent>
                                {keys.description}<br/>
                                {/* {keys.colab.map((item)=> {
                                    
                                    return (
                                    <Chip label=  {item.userEmailId} variant="outlined"/>
                                      );                                   
                                })} */}
                            </CardContent>
                        </div>
                        <CardActions  >                            
                                <MoreTrash noteId={keys.id} moreTrashToDeleteNote={this.deleteNote}/>
                       
                        </CardActions>
                    </Card >
                    <Dialog open={this.state.openDialog} >
                        < Card className="note-dialog" style={{ boxShadow: "1px 1px 1px 1px" }
                        } >
                            <CardContent>
                                {keys.title}
                            </CardContent>
                            <CardContent>
                                {keys.description}
                            </CardContent>
                            <CardActions>
                              
                                    <MoreTrash noteId={keys.id} moreTrashToDeleteNote={this.deleteNote} />
                                
                                <Button className="button-close" onClick={this.closeDialog}>Close</Button>
                            </CardActions>
                        </Card >
                    </Dialog>
                </div >
            )
        })
        return (
            <div className="deleteNotePage" >
                <MuiThemeProvider theme={themes}>
                    {getAllNote}
                </MuiThemeProvider>
            </div >
        )
    }
}
export default withRouter(DeletNote);