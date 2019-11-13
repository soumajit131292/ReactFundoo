import React, { Component } from 'react';
import { NoteController } from '../../Controller/NoteController';
import { InputBase, Card, Tooltip, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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



    render() {
        console.log(this.state.notes)
        const viewNote = !this.props.view ? "note-display" : "fullbox-display"
        const viewFooter = !this.props.view ? "note-display-footer" : "fullbox-display-footer"
        // console.log(this.props.labelName)
        // let getAllNotes = this.state.notes.map((keys) => {
        //     return <div key={keys.id}>
        //         {keys.note.labels.map((labela) => {
        //             return (<div key={labela.id}>
        //                 {labela.labelName === this.props.labelName ? labela.labelName : ''}
        //             </div>
        //             );
        //         })}
        //     </div>
        // })
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

                                    </CardContent>
                                </div>
                                <CardActions className={viewFooter}>
                                    <Remainder />
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
                                    <CardActions className={viewFooter}>
                                        <Remainder />
                                        <Collaborator noteId={keys.note} />



                                        <Archive note={keys.note.id} />
                                        <Color noteId={keys.note.id} />
                                        <More noteId={keys.note.id} />
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