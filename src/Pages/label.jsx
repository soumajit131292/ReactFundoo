import React, { Component } from 'react';
import Appbar from '../Components/Dashboard/Appbar';
import DisplayLabelNotes from '../Components/Dashboard/displayLabelNotes';

export default class Label extends Component {
    render() {
        return (
            <div>
                 <Appbar ></Appbar>
<DisplayLabelNotes labelId={this.props.match.params.labelForNote}/>
            </div>
        )
    }
}

