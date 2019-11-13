import React, { Component } from 'react';
import Appbar from '../Components/Dashboard/Appbar';
import DisplayLabelNotes from '../Components/Dashboard/displayLabelNotes';
import Note from '../Components/Dashboard/Note';
export default class Label extends Component {
    constructor(props){
        super(props);
        this.state={
            update:false,
            list: false,
              
        }
      //  this.newNote=React.createRef();
    }
    listView = (event) => {
        this.setState({
            list: !this.state.list,
          
        })
        console.log(this.state.list)
    }
    render() {
       
        return (
            <div>
                <Appbar listView={this.listView}></Appbar>
                <Note />
                <DisplayLabelNotes labelName={this.props.match.params.labelForNote} view={this.state.list}/>
            </div>
        )
    }
}