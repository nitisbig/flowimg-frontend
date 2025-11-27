'use client'
import { SiteHeader } from "@/components/header";
import ImgWindow from "@/components/imageWindow";
import InputBox from "@/components/inputBox";
import { useState } from "react";


export default function App(){
  const [prompt, setPrompt] = useState('')
  return(
    <div>
      <ImgWindow prompt={prompt}/>
      <InputBox onSubmit={setPrompt} />
    </div>
  )
}