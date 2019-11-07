import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
class DisplayLabelNotes extends Component {
    constructor(props) {
        
        super(props);
       
        
        
    }
    render() {
        console.log(this.props.labelName)
        return (
            <div>
                i m soumajit
                hiii,
                
                
                
            </div>
        )
    }
}

export default withRouter(DisplayLabelNotes)