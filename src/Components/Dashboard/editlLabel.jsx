import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Drawer, MenuItem, Divider, ClickAwayListener, Button, Dialog, TextField, DialogContent } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { updateLabel } from '../../Controller/label';
class EditLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labelName: '',
            click: false,
            labelDialog: true,
            detectChange: false,
            labelCreate:'',
        }
    }
    labelNameChange = (event) => {
        this.setState({
            labelName: event.target.value,
            detectChange: true
        })
        console.log(this.state.labelName)
    }
    editLabel = () => {
        this.setState({
            labelName: this.props.label.labelName,
            click: true
        })


    }
    handleUpdateLabel = () => {
        console.log('hello', this.props.label.id)
        if (this.state.labelName === '' || this.state.detectChange === false){
            this.props.data.changeLabelDialog(false)
        }

        else {
            this.setState({
                labelName: this.state.labelName
            })
            var label = {
                'labelName': this.state.labelName
            }
            updateLabel(this.props.label.id, label).then((res) => {
                this.setState({
                    labelCreate : !this.state.labelCreate
                })
                this.props.editedLabel(this.state.labelCreate)
                this.props.data.changeLabelDialog(false)
                console.log(res.data)
            })

        }
    }
    render() {
        return (
            <div onClick={this.editLabel}>
               
                {!this.state.click ? this.props.label.labelName : <TextField
                    type="text"
                    multilined
                    value={this.state.labelName}
                    onChange={this.labelNameChange}
                />}
                
                < CreateIcon onClick={this.handleUpdateLabel} style={{ paddingLeft: "123px" }} />
                </div>
           
        )
    }
}
export default withRouter(EditLabel)