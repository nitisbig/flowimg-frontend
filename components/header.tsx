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
import { Github, MoonIcon, LucideLinkedin, LogOut, User } from "lucide-react"
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
    <div className="flex justify-between items-center h-16 px-4">
      <div className="flex items-center gap-1">
        <SidebarTrigger />
        <Image src={'/logo.svg'} alt="logofdf" width={144} height={24} />
      </div>
      <div className="flex justify-center items-center gap-1">
        <Button 
          variant={'outline'} 
          onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        >
          <MoonIcon />
        </Button>
        <Button variant={'link'}>
          <Link href={'https://github.com/nitisbig'}>
            <Github />
          </Link>
        </Button>
        <Button variant={'link'}>
          <Link href={'https://www.linkedin.com/in/menitesh'}>
            <LucideLinkedin />
          </Link>
        </Button>
        <Button variant={'link'}>
          <Link href={'docs'}>Docs</Link>
        </Button>
        
        {!loading && (
          <>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session.user?.image} alt={session.user?.name || 'User'} />
                      <AvatarFallback>
                        {session.user?.name ? getInitials(session.user.name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user?.name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
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
              <>
                <Button variant={'link'}>
                  <Link href={'login'}>LogIn</Link>
                </Button>
                <Button variant={'default'}>
                  <Link href={'signup'}>SignUp</Link>
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}