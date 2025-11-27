'use client'
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface InputBoxProps{
    onSubmit: (value: string) => void
}

export default function InputBox({onSubmit}: InputBoxProps){
    const [val, setVal] = useState<string>('')
    return(
        <div className=" absolute top-1/2 right-1/2 transform translate-x-1/2 w-1/3">
            <Textarea value={val} onChange={(e)=>setVal(e.target.value)} />
            <Button onClick={()=>onSubmit(val)} variant={"default"}>Generate</Button>
        </div>
    )
}