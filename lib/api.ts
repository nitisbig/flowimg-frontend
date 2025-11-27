import axios from "axios";



const api = axios.create({
    baseURL: 'http://34.90.21.177:8000/',
    headers: {
        "x-api-key": 'myapi'
    }
})


export default api