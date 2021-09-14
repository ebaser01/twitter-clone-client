import axios from "axios";

export const API_PREFIX = "https://enigmatic-depths-73300.herokuapp.com/";


export const enum reqMethod{
    POST= "POST",
    GET= "GET",
    UPDATE= "UPDATE",
    DELETE = "DELETE"
}


export const apiRequest = (method: reqMethod, url: string, data?:any) => {
    const AUTH_HEADER = "Bearer " + JSON.parse(localStorage.user).token;
    switch(method){
        case "POST":
            return axios.post(
                (API_PREFIX + url),
                data,
                {
                    headers: { Authorization: AUTH_HEADER}
                }
            );
        case "GET":
            return axios.get(
                (API_PREFIX + url),
                {
                    headers: { Authorization: AUTH_HEADER}
                }
            );
        case "UPDATE":
            return axios.put(
                (API_PREFIX + url),
                data,
                {
                    headers: { Authorization: AUTH_HEADER}
                }
            );
        case "DELETE":
            return axios.delete(
                (API_PREFIX + url),
                {
                    headers: { Authorization: AUTH_HEADER}
                }
            );
    }
}