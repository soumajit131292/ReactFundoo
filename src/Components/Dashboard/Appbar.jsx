import React, { Component } from 'react'

import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, IconButton, MuiThemeProvider, createMuiTheme, ClickAwayListener } from '@material-ui/core';
import SideNav from './sideNav';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import Logout from '../logout';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Close'
import { InputBase } from '@material-ui/core';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import { withRouter } from 'react-router-dom';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import ViewStreamOutlinedIcon from '@material-ui/icons/ViewStreamOutlined';
import search from '../../Controller/search';
import SearchNote from '../Dashboard/searchNote';
import Profile from '../Dashboard/profile';
const themes = createMuiTheme({
    overrides: {
        MuiIconButton: {
            root: {
                padding: "2px",
               // paddingTop: "10px"
            }
        },
        // MuiAppBar:{
        //     positionFixed: {
        //     position:"fixed"
        // }
   // },MuiToolbar
   MuiToolbar:{
    root:{
    paddingTop: "70px"
        
    }
    }
    }

})


class Appbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drwaerOpen: false,
            refresh: false,
            view: false,
            searchTitle: "",
            searchNotes: [],
            searchState: false,
            drawerClose: false,
            field: 'title',
            newComp: false,
            hello: "man"
        }
    }
    handleViewOpen = async () => {
        await this.setState({
            view: !this.state.view
        })
        this.props.listView(this.state.view)
        // this.props.menu(this.state.hello)
        console.log(this.props)
        console.log(this.props.listView)
    }
    handleDrawerOpen = () => {
        if (this.state.drwaerOpen === false) {
            this.setState({
                drwaerOpen: true,
            })
        }
        else {
            this.setState({
                drwaerOpen: false,
            })
        }
    }
    searchnote = async (event) => {
     await   this.setState({
            searchTitle: event.target.value,
            
        })
        console.log('111111',this.state.searchTitle);
        
        search(this.state.field,this.state.searchTitle)
        .then((res)=>{
            this.setState({
                searchNotes : res
            })
            this.props.searchable(this.state.searchNotes)
            console.log('22222',res)
            
       }).catch((err)=>{
        console.log('333333',err)
       })
       
       //this.props.history.push('/search')
       // console.log(search)
       // this.props.searchnotes(this.state.search)       
    }
    openChild =()=>{
        search(this.state.field,this.state.searchTitle).then((res)=>{
            this.setState({
                searchNotes : res.data
            })
            console.log(res.data)   
             this.props.searchable(this.state.searchNotes)        
        })
       // this.props.history.push('/search')
    }
    openchildpage=()=>{
        this.props.history.push('/search')
    }
    render() {
        return (
            <div className="appBar">
                <MuiThemeProvider theme={themes}>
                    <AppBar position="fixed" style={{ background: '#ffffff', height: "70px", display: "flex", justifyContent: "center" }}  >
                        <Toolbar className="toolbar">
                            <div style={{paddingRight:"10px"}}>
                                <IconButton style={{ padding: "10px" }} onClick={this.handleDrawerOpen}>
                                    <MenuIcon />
                                </IconButton>
                                <SideNav menubar={this.state.drwaerOpen} />
                            </div>
                            <div className="image">
                                <img src={require('../../asserts/images/gooleKeep.png')}
                                    width="40px" height="40px" />
                            </div>
                            <div style={{color: "#b71c1c" }}>                             
                                {(this.props.location.state !== undefined) ? this.props.location.state : "Fundoo"}
                            </div>                           
                            <div className="search">
                                <IconButton style={{ padding: "10px",cursor: "pointer"}}  onClick={this.openChild}>
                                    <SearchIcon />
                                </IconButton>
                                <InputBase
                                    style={{ width: "100%" }}
                                    placeholder="Search....."
                                    value={this.state.search}
                                    onChange={this.searchnote} 
                                    onClick={this.openchildpage}                                 
                                />
                                <IconButton style={{ padding: "10px" }} >
                                    <ClearIcon />
                                </IconButton>
                            </div>
                            <div className="right" >
                                {/* <IconButton style={{ padding: "10px" }}> */}
                                    <RefreshOutlinedIcon />
                                {/* </IconButton> */}
                                <IconButton style={{paddingRight:"10px"}} onClick={this.handleViewOpen}>
                                    {this.state.view ? <DashboardOutlinedIcon  className="viewIcon" />
                                        : <AppsOutlinedIcon  className="viewIcon" />}
                                </IconButton>
                            </div>
                            <div className="profile" >
                                <Profile />
                            </div>
                            <Logout />
                        </Toolbar>
                        <SearchNote open={this.state.newComp}/>
                    </AppBar>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(Appbar);