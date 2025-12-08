'use client'
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { ArrowUp } from "lucide-react";



export default function InputBox(){
    const queryClient = useQueryClient()
    const mutaion = useMutation({
        mutationFn: async(prompt: string)=>{
            const res = await api.post('/img/',{prompt})
            return res.data as string
        },
        onSuccess: (data)=>{
            queryClient.setQueryData(['generated-image'], data)
        }
    })
    const [val, setVal] = useState<string>('')


    return(
        <div className="flex justify-center mb-18 gap-1 items-center">
            <Textarea placeholder="Start type here..." className="w-1/2 resize-none text-wrap field-sizing-content" value={val} onChange={(e)=>setVal(e.target.value)} />
            <Button className=" rounded-full" size={"icon-lg"} disabled={mutaion.isPending ? true: false} onClick={()=>mutaion.mutate(val)} variant={"default"}><ArrowUp /></Button>
        </div>
    )
}