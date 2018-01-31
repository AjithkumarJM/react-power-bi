import axios from 'axios';
import {stringify} from 'query-string';
import cookie from 'react-cookies';

const ROOT_URL = "http://192.168.1.21:81/api/"; // Local Dev URL
let refresh_flag = 0;

function getToken() {
    return cookie.load('session');
}

function API_CALL(method, url, data, type, callback, file) {
    axios.interceptors.response.use(undefined, function (err) {
        if (refresh_flag == 0){
            refresh_flag = 1;
            axios({
                method: 'post',
                url: ROOT_URL + 'token',
                data: stringify({
                    grant_type: 'refresh_token',
                    refresh_token: getToken().refresh_token
                })
            }).then((res)=>{
                refresh_flag = 0;
                cookie.remove('session', {path: '/'});
                cookie.save('session', res.data, {path: '/'});
                console.log("New token:" +getToken().refresh_token);
                window.location.reload();
            }).catch((Error)=>{
                if (Error) {
                    cookie.remove('session', {path: '/'});
                    window.location.href = '/';
                }
            });
        }
        throw err;
    });
    let respon;
    if (callback) {
        respon = axios({
            method,
            url: ROOT_URL + url,
            data,
            headers: {
                Authorization: 'Bearer ' + getToken().access_token 
            },
            responseType: file ? 'arraybuffer' : 'json'
        }).then((data)=>callback(data));
    } else {
        respon = axios({
            method,
            url: ROOT_URL + url,
            data,
            headers: {
                Authorization: 'Bearer ' + getToken().access_token 
            }
        });
    }
    console.log("Calling API for the method of " + method + " : " + ROOT_URL + url);
    return {
        type,
        payload: respon
    }
}

export function login(values, callback, errorHandler) {
    values.grant_type = 'password';
    let response = axios.post(ROOT_URL + 'login', stringify(values))
        .then((data)=>callback(data))
        .catch((data)=>errorHandler(data));
    return {
        type: 'LOGIN',
        payload: response
    };
}

// Header Action - Starts

export function getUserDetails() {
    let payload = {
        token: getToken().access_token
    };
    return API_CALL('post', 'me', payload, 'GET_ME');
}

// Header Action - Ends

