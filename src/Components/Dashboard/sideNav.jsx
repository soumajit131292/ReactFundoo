import React, { Component } from 'react';
import { Drawer, MenuItem, Divider, ClickAwayListener, Button, Dialog,  TextField, DialogContent } from '@material-ui/core';
import { Card, CardContent } from '@material-ui/core';

import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import { withRouter } from 'react-router-dom';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import LabelOutlinedIcon from '@material-ui/icons/LabelOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import CreateIcon from '@material-ui/icons/Create';
import { getAllLabels } from '../../Controller/NoteController';
import { label } from '../../Controller/label';
import { deleteLabel, updateLabel } from '../../Controller/label';
import { getTrashedNotes } from '../../Controller/NoteController';
import EditLabel from '../Dashboard/editlLabel';
import  DisplayLabelNotes from '../Dashboard/displayLabelNotes'

const themes = createMuiTheme({
    overrides: {
        MuiDrawer: {
            paper: {
                top: "75px",
                display: "table"
            }, paperAnchorLeft: {
                width: "250px"
            }
        }
    }
})

 class sideNav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            labels: [],
            labelDialog: false,
            labelName: '',
            trashNotes: [],
            changLabel: false,
            newLabelName:'',
            labelIdforFetchingNote:'',
            labelForNote:''
  }
    }
    componentDidMount() {
        this.getLabels();
    }
    dialogOpen = () => {
        this.setState({
            labelDialog: !this.state.labelDialog
        })
    }
    getLabels = () => {
        getAllLabels().then((response) => {
            console.log('data', response.data);
            this.setState({
                labels: response.data,
            })
        })
    }
    labelNameChange = (event) => {
        this.setState({
            labelName: event.target.value,
        })
        console.log(this.state.labelName)
    }
    createLabel = () => {
        if (this.state.labelName === '') {
            return this.setState({
                labelDialog: !this.state.labelDialog
            })
        }
        else {
            let labelData = {
                "labelName": this.state.labelName,
            }
            label(labelData).then((res) => {
                this.setState({
                    labelDialog: !this.state.labelDialog
                })
                 console.log(res.data)
            })
        }
    }
    getTrashNotes = () => {
        getTrashedNotes().then((res) => {
            console.log(res.data)
            this.trashNotes = res.data
        })
    }
    handleDelete = async () => {
        
     await   this.props.history.push('/delete')
    }
    getAllNotes=()=>{
        this.props.history.push('/home')
    }
    archievedPage=()=>{
        this.props.history.push('/unarchive')
    }
    deleteLabel=(labelId)=>{
        deleteLabel(labelId).then((res)=>{
            console.log(res.data)
            this.setState({
                labelDialog: !this.state.labelDialog
            })
            
        })
    }
    
    updateLabelName=(event)=>{
this.setState({
    newLabelName : event.target.value
})

    }
    handleUpdateLabel=(labelId)=>{
        console.log('hello',labelId)
        if(this.state.labelName==='')
        return this.setState({
            labelDialog: !this.state.labelDialog
        })
    
        else{
            var label={
                'labelName':this.state.labelName
            }
        updateLabel(labelId,label).then((res)=> {
         console.log(res.data)
        })

        }
    }
    changeLabelDialog(item){
        this.setState({
            labelDialog:item
        })
    }
    getNotes=(data)=>{
        this.setState({
            labelIdforFetchingNote:!this.state.labelIdforFetchingNote
        })
    }
    handleLabelChild=(label)=>{
        console.log(label.id)
        console.log(label)
        
        console.log("labelforname------->",this.state.labelForNote)
        this.props.history.push( '/labelnotes/'+label.labelName )
    }
    
    render() {
        let showLabels = this.state.labels.map((data) => {
           
            return (
                <MenuItem key={data.id}  onClick={()=>this.handleLabelChild(data)} > <LabelOutlinedIcon style={{ paddingRight: "10px" }} />{data.labelName}</MenuItem>
            )
        })
        let showLabelsinDialog = this.state.labels.map((data) => {
           
            return (

                <DialogContent key={data.id} className="dialog-label" style={{ paddingLeft: "2px" }}>

                    <DeleteOutlineOutlinedIcon onClick={()=>this.deleteLabel(data.id)} style={{ paddingRight: "6px", paddingBottom: "4px",cursor: "pointer"}} />
                    
                    
                     <EditLabel label={data} data={{
                     changeLabelDialog:this.changeLabelDialog.bind(this)
                    }}/>
                      {/* {data.labelName} */}
                     
                </DialogContent>
                    )
        })
        return (
            <div >
                <MuiThemeProvider theme={themes}>
                    <Drawer variant='persistent' overflow='auto' open={this.props.menubar} >
                        <MenuItem onClick={this.getAllNotes}>

                            <EmojiObjectsOutlinedIcon />
                            <span>Notes</span>


                        </MenuItem>

                        <MenuItem>
                            <AddAlertOutlinedIcon />
                            <span>
                                Reaminders
                    </span>
                        </MenuItem>

                        <Divider />

                        <div className="label">Labels</div>

                        <div  > {showLabels}</div>



                       
                            <div className="label" onClick={this.dialogOpen} style={{ cursor: "pointer" }} ><CreateIcon style={{ paddingRight: "10px" }} />Edit labels</div>
                     
                        <Divider />
                        <Dialog open={this.state.labelDialog}>
                            <Card>
                                <CardContent>

                                    <ClearOutlinedIcon />
                                    <TextField
                                        type="text"
                                        placeholder="label name"
                                        multiline
                                        onChange={this.labelNameChange}

                                    />
                                    <DoneOutlinedIcon onClick={this.createLabel} />

                                    {showLabelsinDialog}


                                </CardContent>

                            </Card>
                        </Dialog>

                       
                            <MenuItem onClick={this.archievedPage}>

                                <ArchiveOutlinedIcon />
                                Archived Notes
                            </MenuItem>
                       

                        <MenuItem onClick={this.handleDelete}>
                            <DeleteOutlineOutlinedIcon />
                            
                                Delete Notes
                                


                        </MenuItem>



                    </Drawer>
                </MuiThemeProvider>
            </div>
        )
    }
}
export default withRouter(sideNav);