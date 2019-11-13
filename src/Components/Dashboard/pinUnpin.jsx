import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import { setPinUnpin } from '../../Controller/NoteController';

import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
 class PinUnpin extends Component {
    setpinUnpin=()=>{
        console.log('noteid',this.props.noteId)
        setPinUnpin(this.props.noteId).then((res)=>{
            console.log(res.data.object)
        })
    }
    render() {
        return (
            <div>
                 <PauseCircleOutlineIcon onClick={this.setpinUnpin}/>
            </div>
        )
    }
}
export default withRouter(PinUnpin)