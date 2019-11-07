import React, { Component } from 'react';
import { archive } from './archive';
import more from './more';
import { Card, InputBase, Button, ClickAwayListener, Tooltip, Chip } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createNote } from '../../Controller/NoteController';


class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            windowOpen: false,
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
                
            }).catch((err)=>{
                console.log('err',err.response.data.message)
            });
        }
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
                        <archive />
                        <more />
                        <Button style={{ paddingTop: "0%",float: "right"}} onClick={this.handleClickClose}>Close</Button>

                    </Card>)}
               
            </div>
        )
    }
}
export default withRouter(Note);