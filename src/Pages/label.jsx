import React, { Component } from 'react';
import Appbar from '../Components/Dashboard/Appbar';
import DisplayLabelNotes from '../Components/Dashboard/displayLabelNotes';
import Note from '../Components/Dashboard/Note';
export default class Label extends Component {
    constructor(props){
        super(props)
    }
    
    render() {
       
        return (
            <div>
                <Appbar ></Appbar>
                <Note />
                <DisplayLabelNotes labelName={this.props.match.params.labelForNote} />
            </div>
        )
    }
}