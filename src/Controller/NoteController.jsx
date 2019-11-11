
import axios from 'axios';

const headers={
    'Content-Type': 'application/json',
    'token':localStorage.getItem('token')
}
export function NoteController() {
    
    let header = {
        'Content-Type': 'application/json',
        'token': localStorage.getItem("token")
    }
    return axios.get("http://localhost:8080/" + 'notes/getnotes/'+localStorage.getItem('token'), { header: header });
}
export function getAllLabels() {
    console.log(localStorage.getItem('token'))
    let header = {
        'Content-Type': 'application/json',
        
    }
    return axios.get("http://localhost:8080/" + 'label/getlabels/'+localStorage.getItem('token'), { header: header });
}
export function createNote(noteDetails) {
    console.log(localStorage.getItem('token'))
    let header = {
        'Content-Type': 'application/json',
        }
    return axios.post("http://localhost:8080/" + 'notes/createnote/'+localStorage.getItem('token'),noteDetails, { header: header });
}
export function updateNote(note,id) {
    let headers = {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
    }
    console.log('id of note',id)
    console.log('headr',headers)
    console.log('note',note)
    return axios.put('http://localhost:8080/notes/updatenote/'+id,note, { headers: headers});
}
export function trashNote(noteId)
{
    console.log('headers',headers)
    console.log('noteId',noteId)
    return axios.put('http://localhost:8080/notes/trash/'+noteId,null,{ headers : headers });
}
export function getTrashedNotes(){
    return axios.get('http://localhost:8080/notes/getrashnotes',{ headers : headers });
}
export function deletTrashedNotes(noteId){
    return axios.delete('http://localhost:8080/notes/deletenote/'+noteId,{ headers : headers });
}
export function archiveNote(noteId)
{
    return axios.put('http://localhost:8080/notes/archive/'+noteId,null,{ headers : headers });
}
export function getArchivedNotes(){
    return axios.get('http://localhost:8080/notes/getarchivenotes',{ headers : headers });
}

export function setRemainder(abc,notId)
{
    console.log('before',abc)
   let datetim=new Date(abc).toISOString();
   console.log('after',datetim)
   console.log('param',headers)
    return axios.post('http://localhost:8080/notes/remainder?datetime='+datetim+'&noteId='+notId,{ headers : headers });
}
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJJZCI6MX0.dL6z9dPcxpXnrQgKN_3b8yRKVuaNGMC2-0o9W3SMY7oPGTizuoKkPp2MHJbCQ3Uv5S4IDfDpmhHbodVRU_mh5g