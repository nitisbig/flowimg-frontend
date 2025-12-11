'use client'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Moon, Linkedin, LogOut, User, Menu, MoonIcon, LucideLinkedin } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { useEffect, useState } from "react"
import Image from "next/image"

export function SiteHeader() {
  const { setTheme } = useTheme()
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await authClient.getSession()
      if (!error && data) {
        setSession(data)
      }
      setLoading(false)
    }
    
    fetchSession()
  }, [])

  const handleSignOut = async () => {
    await authClient.signOut()
    setSession(null)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="flex justify-between items-center h-16 px-3">

      <div className="flex items-center gap-0.5">
        <SidebarTrigger />
        <Image 
          src={'/logo.svg'} 
          alt="logo" 
          width={120} 
          height={20} 
          className="sm:w-35 sm:h-10"
        />
      </div>

  
      <div className="flex justify-center items-center gap-0.5 sm:gap-1">

        <Button 
          variant={'outline'} 
          size="icon"
          className="h-9 w-9 sm:h-10 sm:w-10"
          onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        >
          <MoonIcon className="h-4 w-4" />
        </Button>


        <div className="hidden sm:flex items-center gap-1">
          <Button variant={'link'} size="icon">
            <Link href={'https://github.com/nitisbig'}>
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant={'link'} size="icon">
            <Link href={'https://www.linkedin.com/in/menitesh'}>
              <LucideLinkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant={'link'} className="hidden lg:flex">
            <Link href={'docs'}>API Docs</Link>
          </Button>
        </div>


        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={'https://github.com/nitisbig'} className="cursor-pointer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={'https://www.linkedin.com/in/menitesh'} className="cursor-pointer">
                  <LucideLinkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={'docs'} className="cursor-pointer">
                  API Docs
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

    

   
        {!loading && (
          <>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full">
                    <Avatar className="h-9 w-9 sm:h-10 sm:w-10">
                      <AvatarImage src={session.user?.image} alt={session.user?.name || 'User'} />
                      <AvatarFallback className="text-xs sm:text-sm">
                        {session.user?.name ? getInitials(session.user.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none truncate">
                        {session.user?.name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <Button variant={'ghost'} size="sm" className="hidden sm:flex">
                  <Link href={'login'}>Log In</Link>
                </Button>
                <Button variant={'default'} size="sm" className="text-xs sm:text-sm">
                  <Link href={'signup'}>Sign Up</Link>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}