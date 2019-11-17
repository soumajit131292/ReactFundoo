import React, { Component } from 'react'
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import { withRouter } from 'react-router-dom';
import { Paper, Tooltip, Popper } from '@material-ui/core';

import { keys } from '@material-ui/core/styles/createBreakpoints';
import { AppBar, Toolbar, IconButton, ClickAwayListener } from '@material-ui/core';
import {  setColour } from '../../Controller/NoteController';

const colorPalette = [{ name: "default", colorCode: "#FDFEFE" },
{ name: "Red", colorCode: "#ef9a9a" },
{ name: "Cyan", colorCode: "#80deea" },
{ name: "Blue", colorCode: "#2196f3" },
{ name: "Indigo", colorCode: "#9fa8da" },
{ name: "LightBlue", colorCode: "#90caf9" },
{ name: "Purple", colorCode: "#b39ddb" },
{ name: "Yellow", colorCode: "#c5e1a5" },
{ name: "Lime", colorCode: "#e6ee9c" },
{ name: "Pink", colorCode: "#f48fb1" },
{ name: "gray", colorCode: "#eeeeee" },
{ name: "Brown", colorCode: "#bcaaa4" },
]
class Color extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openPalate: false,
            anchorEl: null,
            addLabelDialogBox : null,
            colorChange:false
        }

    }
    openPalete = (e) => {

        this.setState({

            anchorEl: this.state.anchorEl ? !this.state.anchorEl : e.target
        })
    }

    handleClickCloseAwayLabel = () => {
        this.setState({
            anchorEl : !this.state.anchorEl
        })
    }
    handleChangeColor=(color)=>{
        console.log(color.colorCode)
        console.log(this.props.noteId)
        setColour(color.target.value,this.props.noteId).then((res)=>{
            this.setState({
                colorChange:!this.state.colorChange,
                anchorEl : !this.state.anchorEl

            })
            this.props.changed(this.state.colorChange)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err.data)
        })
    }
    render() {
        let colors = colorPalette.map((color) => {
            return (               
                <Tooltip title={color.name}>
                <IconButton style={{ backgroundColor: color.colorCode, border: "silver 2px solid" }}
                    value={color.name}
                     onClick={this.handleChangeColor}
                    >
                </IconButton>
            </Tooltip>
            )
        })

        return (
            <div>

                <Tooltip title="Color" >
                    <ColorLensOutlinedIcon onClick={(e) => this.openPalete(e)}
                        style={{
                            zIndex: "9999", marginTop: "5px", position: "static"
                        }}
                    />

                </Tooltip>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl}
                    style={{ marginTop: "5px", zIndex: "9999999" }}>
                         <ClickAwayListener onClickAway={this.handleClickCloseAwayLabel}>
                    <Paper className="reminder-paper">
                        {colors}
                    </Paper>
                    </ClickAwayListener>
                </Popper>

            </div>
        )
    }
}
export default withRouter(Color)