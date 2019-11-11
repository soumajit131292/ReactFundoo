import React, { Component } from 'react'

import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, IconButton, MuiThemeProvider, createMuiTheme, ClickAwayListener } from '@material-ui/core';
import SideNav from './sideNav';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import  Logout from '../logout';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Close'
import { InputBase } from '@material-ui/core';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import { withRouter } from 'react-router-dom';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import ViewStreamOutlinedIcon from '@material-ui/icons/ViewStreamOutlined';

const themes = createMuiTheme({
    overrides: {
        MuiIconButton: {
            root: {
                padding: "2px"
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
            search: "",
            searchNotes: [],
            searchState: false,
            drawerClose:false
        }
    }
    handleViewOpen=async()=>{
       await this.setState({
            view: !this.state.view
        })
        this.props.listView(this.state.view)
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
    render() {
        return (
            <div className="appBar">
                <MuiThemeProvider theme={themes}>
                <AppBar style={{ background: '#ffffff',height:"70px",display: "flex",justifyContent:"center" }}  >
                    <Toolbar className="toolbar">
                        <div className="menu">
                            <IconButton style={{ padding: "10px" }} onClick={this.handleDrawerOpen}>
                                <MenuIcon />
                            </IconButton>
                            <SideNav menubar={this.state.drwaerOpen} />

                        </div>
                        <div style={{color:"blue"}}>
                            {(this.props.location.state !== undefined) ? this.props.location.state : "Fundoo"}
                        </div>
                        <div className="image">
                           
                            <img src={require('../../asserts/images/gooleKeep.png')}
                                width="40px" height="40px" />
                        </div>
                        
                        <div className="search">
                            <IconButton style={{ padding: "10px" }} >
                            <SearchIcon />
                            </IconButton>
                            <InputBase
                                style={{ width: "100%" }}
                                placeholder="Search....."
                                value={this.state.search}
                                
                            />
                            <IconButton style={{ padding: "10px" }} >
                                <ClearIcon />
                            </IconButton>
                        </div>
                        <div className="right">
                            <IconButton >
                                <RefreshOutlinedIcon />
                            </IconButton>
                            <IconButton >
                            {this.state.view ? <DashboardOutlinedIcon onClick={this.handleViewOpen} className="viewIcon" />
                                : <AppsOutlinedIcon onClick={this.handleViewOpen} className="viewIcon" />}
                            </IconButton>
                            </div>
                        
                        <div className="profile" >
                            
                        </div>
                        <Logout />
                    </Toolbar>

                </AppBar>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(Appbar);