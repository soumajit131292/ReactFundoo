import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import Appbar from '../Components/Dashboard/Appbar';
import SearchNote from '../Components/Dashboard/searchNote';
class NoteSearchPage extends Component {
constructor(props){
    super(props)
    this.state={
        searchResult: [],      
    }
}
item=async(results)=>{
   console.log("results in item",results.data);
  await this.setState({
        searchResult : results.data
    })
    console.log(this.state.searchResult)
}
    render() {
        console.log("yse",this.state.searchResult)
        return (
            <div>     
                 <Appbar searchable={this.item} ></Appbar>                                       
                <SearchNote elasticSearch={this.state.searchResult}
                updatedSearchResult={this.state.searchResult} />
            </div>
        )
    }
}
export default withRouter(NoteSearchPage)