import axios from "axios";

const api_key = process.env.NEXT_PUBLIC_MY_API

const api = axios.create({
    baseURL: 'https://api.flowdira.com',
    headers: {
        "x-api-key": api_key
    }
})


export default api