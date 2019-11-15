import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import { Tooltip } from '@material-ui/core';
import { archiveNote } from '../../Controller/NoteController';
class Archive extends Component {
    constructor(props) {
        super(props)
        this.state = {
archieve : false
        }
    }
    handleArchive = () => {

        console.log(this.props.note)
        archiveNote(this.props.note).then((res) => {
            this.setState({
                archieve : true
            })
            this.props.archievedDoneResposne(this.state.archieve)
            console.log(res.data)
        })
    }
/*     {(e)=>{this.handleClick(e)}}   
can be passed event like that..
*/ 
    render() {
        return (
            <div>
                <Tooltip title="Archive">
                    <ArchiveOutlinedIcon onClick={this.handleArchive} />
                </Tooltip>

            </div>
        )
    }
}
export default withRouter(Archive)