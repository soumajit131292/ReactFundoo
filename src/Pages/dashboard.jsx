import React, { Component } from 'react'
import Appbar from '../Components/Dashboard/Appbar';
import Note from '../Components/Dashboard/Note';
import AllNotes from '../Components/Dashboard/allNotes';
export default class dashboard extends Component {
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

    noteToDashboard=(note)=>{
        console.log("curretn card",note);
        this.newNote.current.updateCard(note);
    }
    render() {
        console.log(this.state.list)
        return (
            <div>
                <Appbar listView={this.listView}></Appbar>
               {/* <Note noteToDashboard={this.noteToDashboard} /> */}
               <Note />
               {/* <AllNotes 
               ref={this.newNote}
               /> */}
               <AllNotes view={this.state.list}/>

            </div>
        )
    }
}
