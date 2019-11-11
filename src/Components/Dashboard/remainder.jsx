import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { Tooltip, ClickAwayListener } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import DateTimePicker from 'react-datetime-picker';
import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { setRemainder } from '../../Controller/NoteController';
class Remainder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: false,
            selectedDate: new Date(),
        }
    }
    handleDateTimePick = (e) => {
        this.setState({
            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        })
    }
    handleChangeDate = (data) => {
        this.setState({
            selectedDate: data
        })
        console.log('noteId in remainder', this.props.noteId);
        console.log('data', this.state.selectedDate)
        setRemainder(data, this.props.noteId).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    handleClickAway = () => {
        this.setState({
            anchorEl: null
        })
    }
    render() {
        return (
            <div>
                <Tooltip title="Remind me" >
                    <AddAlertOutlinedIcon onClick={(e) => { this.handleDateTimePick(e) }} />
                </Tooltip>
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
            </div>
        )
    }
}
export default withRouter(Remainder)