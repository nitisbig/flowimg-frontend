import axios from "axios";



const api = axios.create({
    baseURL: 'https://api.flowdira.com',
    headers: {
        "x-api-key": 'myapi'
    }
})


export default api