import axios from "axios";

export const API_PREFIX = "https://enigmatic-depths-73300.herokuapp.com/";



const instance =  axios.create(
    {
        baseURL: API_PREFIX,
    }
);

instance.interceptors.request.use(
    function(config){
        const token = localStorage.user? JSON.parse(localStorage.user).token : "";
        if(token){
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    function(err){
        return Promise.reject(err);
    }
);

export default instance;
