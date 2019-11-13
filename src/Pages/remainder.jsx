import React, { Component } from 'react';
import Appbar from '../Components/Dashboard/Appbar';
import  RemainderNotesDisplay  from '../Components/Dashboard/remainderNotesDisplay';
import Note from '../Components/Dashboard/Note';
export default class remainder extends Component {
    constructor(props){
        super(props)
        this.state={
            show : false
        }
    }
    listView=()=>{
        this.setState({
            show : !this.state.show
        })
    }
    render() {
        return (
            <div>
                 <Appbar listView={this.listView}></Appbar>
                 <Note />
                 <RemainderNotesDisplay view={this.state.show}/>
            </div>
        )
    }
}