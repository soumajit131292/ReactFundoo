import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import { setPinUnpin } from '../../Controller/NoteController';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
class UnPin extends Component {
    setpinUnpin=()=>{
        console.log('noteid',this.props.noteId)
        setPinUnpin(this.props.noteId).then((res)=>{
            console.log(res.data.object)
        })
    }
    render() {
        return (
            <div>
                 <PauseCircleFilledIcon onClick={this.setpinUnpin}/>
            </div>
        )
    }
}
export default  withRouter(UnPin)