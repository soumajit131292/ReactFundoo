import React, { Component } from 'react'
import { createNote } from '../Controller/NoteController';
import sideNav from '../Components/Dashboard/sideNav';
import Note from '../Components/Dashboard/Note';
import Appbar from '../Components/Dashboard/Appbar';
import DeletNote from '../Components/Dashboard/deletNote';


export default class deletepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deletPage: true
        }
    }
    render() {
        return (
            <div>
                <Appbar />
                <DeletNote trigger={this.state.deletPage} />
            </div>
        )
    }
}