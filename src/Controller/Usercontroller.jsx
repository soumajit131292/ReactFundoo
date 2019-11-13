
import axios from 'axios';

const headers={
    'Content-Type': 'application/json',
    'token':localStorage.getItem('token')
}
export function Usercontroller(userRegister) {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    let header = {
        'Content-Type': 'application/json'
    }
    return axios.post("http://localhost:8080/" + 'user/register', userRegister, { header: header });
}




export function userLogin(userLogin) {
    const baseUrl = process.env.BASE_URL;

    let header = {
        'Content-Type': 'application/json'
    }
    return axios.post("http://localhost:8080/" + 'user/login', userLogin, { header: header });
}
export function emailVerify(userEmailVerify) {
    const baseUrl = process.env.BASE_URL;

    let header = {
        'Content-Type': 'application/json'
    }
    return axios.post("http://localhost:8080/" + 'user/forgotpassword', userEmailVerify, { header: header });
}

export function userPasswordReset(userPassword,userToken) {
    const baseUrl = process.env.BASE_URL;
    let token=userToken;
    console.log(token)

    let header = {
        'Content-Type': 'application/json'
    }
    return axios.put('http://localhost:8080/user/resetpassword/'+token, userPassword, { header: header });
}

export function userVerify(userToken) {
    const baseUrl = process.env.BASE_URL;
    let token=userToken;
    console.log(token)

    let header = {
        'Content-Type': 'application/json'
    }
    
    return axios.put('http://localhost:8081/user/verify/'+token, null,{ header: header });
    
}

export function getLoggedUser(){
    return axios.get('http://localhost:8081/user/loggedinuser',{ headers : headers });
}

