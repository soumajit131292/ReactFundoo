import React, { Component } from 'react'
import Appbar from '../Components/Dashboard/Appbar';
import Note from '../Components/Dashboard/Note';
import AllNotes from '../Components/Dashboard/allNotes';
export default class dashboard extends Component {
    render() {
        return (
            <div>
                <Appbar ></Appbar>
               <Note></Note>
               <AllNotes></AllNotes>

            </div>
        )
    }
}
