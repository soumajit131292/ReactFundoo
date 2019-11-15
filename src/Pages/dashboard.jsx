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
            noteCreated : false
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
            noteCreated : value
        })
    }
    render() {
        console.log(this.state.noteCreated)
        return (
            <div>
                <Appbar listView={this.listView} ></Appbar>              
                <Note createnote={this.sendResponse}/>              
                <AllNotes show={this.state.list} cretaed={this.state.noteCreated}/>
            </div>
        )
    }
}