import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import { setPinUnpin } from '../../Controller/NoteController';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
class UnPin extends Component {
    constructor(props){
        super(props)
        this.state={
            pinNotify: false
        }
    }
    setpinUnpin=()=>{
        console.log('noteid',this.props.noteId)
        setPinUnpin(this.props.noteId).then((res)=>{
            console.log(res.data.object)
            this.setState({
                pinNotify :!this.state.pinNotify
            })
            this.props.Unpin(this.state.pinNotify)
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