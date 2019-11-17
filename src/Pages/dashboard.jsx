import React, { Component } from 'react'
import Appbar from '../Components/Dashboard/Appbar';
import Note from '../Components/Dashboard/Note';
import AllNotes from '../Components/Dashboard/allNotes';
export default class dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false,
            list: false,
            noteCreation : false
        }
    }
    listView = (event) => {
        this.setState({
            list: !this.state.list,
        })       
    }
    noteToDashboard = (note) => {
        console.log("curretn card", note);
        this.newNote.current.updateCard(note);
    }
    sendResponse=(value)=>{
        this.setState({
            noteCreation : value
        })
        console.log("note creation--->",this.state.noteCreation);
        
    }
    render() {
        console.log(this.state.noteCreation)
        return (
            <div>
                <Appbar listView={this.listView} ></Appbar>              
                <Note createnote={this.sendResponse}/>   
                {this.state.noteCreation}           
                <AllNotes show={this.state.list} 
                newNote={this.state.noteCreation}/>
            </div>
        )
    }
}