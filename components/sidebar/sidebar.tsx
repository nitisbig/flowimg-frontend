import { BarChart, Calendar, ChartArea, GalleryHorizontal, Home, Inbox, KeyIcon, LogOut, Play, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Logout from "../logout"

// Menu items.
const items = [
  {
    title: "Playground",
    url: "/",
    icon: Play,
  },
  {
    title: "Gallery",
    url: "/gallery",
    icon: GalleryHorizontal,
  },
  {
    title: "API keys",
    url: "api_key",
    icon: KeyIcon,
  },
  {
    title: "Usages",
    url: "#",
    icon: ChartArea,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>FlowGen</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarContent>
              <Logout />

          
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  )
}