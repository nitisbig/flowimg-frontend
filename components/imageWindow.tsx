'use client'
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface d{
    "message": string
}

export default function ImgWindow({prompt}: {prompt: string}){
    const [base64, setBase64] = useState("")

    const {data, isLoading} = useQuery({
        queryKey: ["generate", prompt],
        queryFn: async()=>{
            const res = await api.post('/img', {prompt})
            return res.data as d
        }
    }
    )
    if(isLoading) return <div>loading...</div>
    return(
        <div className=" absolute top-1/6 right-1/2">
            {prompt}
            <img style={{width: '200px', borderRadius: '15px'}} src={`data:image/png;base64,${data}`} alt="ohit" />
        </div>
    )
}