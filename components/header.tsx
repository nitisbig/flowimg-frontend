import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"

export function SiteHeader() {
  return (
    <div className="flex justify-between w-full">
      <SidebarTrigger />
      <p>NanoImg</p>
      <Link href="#">Github</Link>
    </div>
  )
}
