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
    render() {
        let getAllNote = this.state.notes.map((keys) => {
            return (
                < div key={keys.id} >
                    < Card key={keys.id} className="note-display" >
                        <div onClick={() => { this.handleClickTakeNote(keys) }}>
                            <CardContent>
                                {keys.title}
                            </CardContent>
                            <CardContent>
                                {keys.description}
                            </CardContent>
                        </div>
                        <CardActions  >
                            <IconButton style={{ padding: "30px" }} >

                                <MoreTrash noteId={keys.id} />
                            </IconButton>
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
                                <IconButton style={{ padding: "30px" }} >

                                    <MoreTrash noteId={keys.id} />
                                </IconButton>
                                <Button className="button-close" onClick={this.closeDialog}>Close</Button>
                            </CardActions>
                        </Card >
                    </Dialog>
                </div >
            )
        })
        return (
            <div className="allNotePage" open={this.props.trigger}>
                <MuiThemeProvider theme={themes}>
                    {getAllNote}
                </MuiThemeProvider>
            </div >
        )
    }
}
export default withRouter(DeletNote);