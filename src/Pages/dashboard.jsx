import React, { Component } from 'react'
import Appbar from '../Components/Dashboard/Appbar';
import Note from '../Components/Dashboard/Note';
import AllNotes from '../Components/Dashboard/allNotes';
export default class dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            update:false
        }
        this.newNote=React.createRef();
    }
    noteToDashboard=(note)=>{
        console.log("curretn card",note);
        this.newNote.current.updateCard(note);
    }
    render() {
        return (
            <div>
                <Appbar ></Appbar>
               {/* <Note noteToDashboard={this.noteToDashboard} /> */}
               <Note />
               {/* <AllNotes 
               ref={this.newNote}
               /> */}
               <AllNotes />

            </div>
        )
    }
}
