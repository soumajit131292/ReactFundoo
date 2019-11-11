import React from 'react'
import axios from 'axios'

const headers={
    'Content-Type': 'application/json',
    'token':localStorage.getItem('token')
}
export function label(label) {
    return axios.post('http://localhost:8080/label/createlabel',label,{ headers : headers})
}
export function deleteLabel(labelId) {
    return axios.delete('http://localhost:8080/label/delete/'+labelId,{ headers : headers})
}

export function updateLabel(labelId,label) {
    return axios.put('http://localhost:8080/label/updatebylabelid/'+labelId,label,{ headers : headers})
}

export function addLabelonNote(labelId,noteId) {
    return axios.put('http://localhost:8080/label/update/'+labelId+'/'+noteId,null,{ headers : headers})
}

export function getNotesByLabelName(labelName){
    return axios.get('http://localhost:8080/label/notebylabelid/'+labelName,{ headers : headers });
}