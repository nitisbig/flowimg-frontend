'use client'
import { SiteHeader } from "@/components/header";
import ImgWindow from "@/components/imageWindow";
import InputBox from "@/components/inputBox";
import { useState } from "react";


export default function App(){

  return(
    <div className="flex flex-col h-full">
      <ImgWindow />
      <InputBox />
    </div>
  )
}