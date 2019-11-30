import React from 'react'
import axios from 'axios';
const headers={
    'Content-Type' : 'application/json',
    'token' : localStorage.getItem("token")
}
export default function search(field,keyword) {
    console.log('field',field)
    console.log('keyword',keyword)
    return axios.get('http://localhost:8082/notes/searchnotes/'+keyword+'/'+field,{headers : headers});
}
