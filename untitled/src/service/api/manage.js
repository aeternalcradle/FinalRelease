import axios from "axios";

axios.defaults.baseURL='http://121.36.214.230:9000';
// axios.defaults.baseURL='http://localhost:9000';

export const getAction = (url,params) =>{
    return axios({
        url:url,
        method:'get',
        params:params
    })
}

export const postAction = (url,data) =>{
    return axios({
        url:url,
        method:'post',
        data:data
    })
}

export const putAction = (url,data) =>{
    return axios({
        url:url,
        method:'put',
        data:data
    })
}

export const deleteAction = (url,data) =>{
    return axios({
        url:url,
        method:'delete',
        data:data
    })
}
