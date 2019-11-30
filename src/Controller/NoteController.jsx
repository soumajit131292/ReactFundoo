
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
    return axios.get("http://localhost:8082/" + 'notes/getnotes/'+localStorage.getItem('token'), { header: header });
}
export function getAllLabels() {
    console.log(localStorage.getItem('token'))
    let header = {
        'Content-Type': 'application/json',
        
    }
    return axios.get("http://localhost:8082/" + 'label/getlabels/'+localStorage.getItem('token'), { header: header });
}
export function createNote(noteDetails) {
    console.log(localStorage.getItem('token'))
    let header = {
        'Content-Type': 'application/json',
        }
    return axios.post("http://localhost:8082/" + 'notes/createnote/'+localStorage.getItem('token'),noteDetails, { header: header });
}
export function updateNote(note,id) {
    let headers = {
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
    }
    return axios.put('http://localhost:8082/notes/updatenote/'+id,note, { headers: headers});
}
export function trashNote(noteId)
{
    return axios.put('http://localhost:8082/notes/trash/'+noteId,null,{ headers : headers });
}
export function getTrashedNotes(){
    return axios.get('http://localhost:8082/notes/getrashnotes',{ headers : headers });
}
export function deletTrashedNotes(noteId){
    return axios.delete('http://localhost:8082/notes/deletenote/'+noteId,{ headers : headers });
}
export function archiveNote(noteId)
{
    return axios.put('http://localhost:8082/notes/archive/'+noteId,null,{ headers : headers });
}
export function getArchivedNotes(){
    return axios.get('http://localhost:8082/notes/getarchivenotes',{ headers : headers });
}
export function setRemainder(abc,noteId)
{
    let datetime=new Date(abc).toISOString();
    return axios.post('http://localhost:8082/notes/remainder?datetime='+datetime+'&noteId='+noteId,null,{ headers : headers });
}
export function deleteRemainder(noteId)
{
    return axios.delete('http://localhost:8082/notes/deleteremainder?noteId='+noteId,{ headers : headers });
}
//eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJJZCI6MX0.dL6z9dPcxpXnrQgKN_3b8yRKVuaNGMC2-0o9W3SMY7oPGTizuoKkPp2MHJbCQ3Uv5S4IDfDpmhHbodVRU_mh5g

export function setPinUnpin(noteId)
{
    return axios.put('http://localhost:8082/notes/changePin?noteId='+noteId,null,{ headers : headers });
}
export function setColour(colorCode,noteId)
{
    console.log(colorCode)
    console.log(noteId)
    return axios.post('http://localhost:8082/notes/setcolor/'+colorCode+'/'+noteId,null,{ headers : headers });
}
export function getColabUser(noteId){
   
    return axios.get('http://localhost:8082/collaborator/colabuser/'+noteId,{ headers : headers });
}