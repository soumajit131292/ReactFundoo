
import axios from 'axios';
const headers={
    'Content-Type': 'application/json',
    'token':localStorage.getItem('token')
}
export function colabController() {
    
}
export function collaboratorAdd(colabBody,noteId) {
    return axios.post('http://localhost:8080/colaborator/addcolaborator/'+noteId, colabBody,{ headers: headers });
}

