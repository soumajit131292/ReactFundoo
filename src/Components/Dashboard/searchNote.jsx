import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { InputBase, Card, Tooltip, TextField, CardContent } from '@material-ui/core';
import PinUnpin from '../../Components/Dashboard/pinUnpin';
import Chip from '@material-ui/core/Chip';
import UnPin from '../Dashboard/unPin';
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
class SearchNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
        }
        this.setState({
            notes: this.props.updatedSearchResult
        })
    }

    render() {
        console.log("updated search result", this.state.notes)
        console.log('size------', this.props.updatedSearchResult)
        if (this.props.updatedSearchResult) {
            var commentNodes = this.props.updatedSearchResult.map((note) => {
                return (
                    <div>
                        <Card>
                            <CardContent>
                                {note.title}
                                {note.pinned === true ? <UnPin noteId={note.id} /> : <PinUnpin noteId={note.id} />}
                                {note.isPinned}
                            </CardContent>
                            <CardContent>
                                {note.description}
                            </CardContent>
                            <CardContent>

                                <div>{note.remainder === null ? '' : <Chip label={note.remainder} onDelete={() => this.deleteRemainder(note)} onClick={(e) => { this.pickerOpen(e) }} variant="outlined" />}
                                    {note.labels.map((labela) => {
                                        return (<div key={labela.id}>{labela === null ? '' :
                                            <Chip label={labela.labelName} onDelete={() => this.deleteLabel(labela)} variant="outlined" />}
                                        </div>);
                                    })}
                                </div>
                            </CardContent>

                        </Card>
                    </div>
                );
            });
        }


        return (
            <div className="allUnThrashNotePage" >
                <MuiThemeProvider theme={themes}>
                    {commentNodes}
                </MuiThemeProvider>
            </div>

        )
    }
}
export default withRouter(SearchNote)