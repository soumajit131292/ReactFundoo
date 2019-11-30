
import axios from 'axios';
const headers={
    'Content-Type': 'application/json',
    'token':localStorage.getItem('token')
}
export function colabController() {
    
}
export function collaboratorAdd(colabBody,noteId) {
    console.log(localStorage.getItem('token'))
    return axios.post('http://localhost:8082/collaborator/addcollab/'+noteId+'/'+colabBody,null, { headers: headers });
}

export function collaboratorDelete(emailId,noteId) {
    
    return axios.delete('http://localhost:8082/collaborator/deleteuser/'+noteId+'/'+emailId, { headers: headers });
}