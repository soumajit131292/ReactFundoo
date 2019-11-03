import React, { Component } from 'react'
import UnArchieve from '../Components/Dashboard/unArchieve';
import Appbar from '../Components/Dashboard/Appbar';
export default class unArchivePage extends Component {
    render() {
        return (
            <div>
                <Appbar ></Appbar>
                <UnArchieve />
            </div>
        )
    }
}
