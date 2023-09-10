import fetch from "unfetch";

const checkStatus = response =>{
    if(response.ok){
        return response;
    }
    const error = new Error(response.status.statusText);
    error.response = response;
    return Promise.reject(error);
}
export const getAllBooks = () =>
    fetch('http://localhost:8081/book')