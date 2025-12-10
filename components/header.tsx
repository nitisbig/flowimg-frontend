'use client'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Github, GithubIcon, Linkedin, LucideLinkedin, MoonIcon } from "lucide-react"
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
        <Button variant={'outline'}  onClick={()=>setTheme(prev => (prev=='dark'?'light':'dark'))}><MoonIcon /></Button>
        <Button variant={'link'}><Link href={'https://github.com/nitisbig'}><Github /></Link></Button>
        <Button variant={'link'}><Link href={'https://www.linkedin.com/in/menitesh'}><LucideLinkedin /></Link></Button>
        <Button variant={'link'}><Link href={'docs'}>Docs</Link></Button>
        <Button variant={'link'}><Link href={'login'}>LogIn</Link></Button>
        <Button variant={'default'}><Link href={'signup'}>SignUp</Link></Button>
      </div>
    </div>
  )
}
