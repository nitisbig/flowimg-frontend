import axios from "axios";



const api = axios.create({
    baseURL: 'https://api.flowdira.com',
    headers: {
        "x-key": process.env.my_api
    }
})


export default api