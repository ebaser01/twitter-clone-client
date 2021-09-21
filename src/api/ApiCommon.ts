import axios from "axios";

export const API_PREFIX = "https://enigmatic-depths-73300.herokuapp.com/";
const AUTH_HEADER = "Bearer " + JSON.parse(localStorage.user).token;


export default axios.create(
    {
        baseURL: "https://enigmatic-depths-73300.herokuapp.com/",
        headers: {Authorization: AUTH_HEADER},
    }
);

