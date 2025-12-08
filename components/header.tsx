'use client'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { MoonIcon } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

export function SiteHeader() {
  const {setTheme} = useTheme()
  return (
    <div className="flex justify-between">
      
      <div>
        <SidebarTrigger />
        FlowImg
      </div>
      <div className="flex justify-center items-center">
        <MoonIcon onClick={()=>setTheme(prev => (prev=='dark'?'light':'dark'))} />
        <Button variant={'link'}><Link href={'docs'}>Docs</Link></Button>
        <Button variant={'link'}>LogIn</Button>
        <Button variant={'default'}>SignUp</Button>
      </div>
    </div>
  )
}
