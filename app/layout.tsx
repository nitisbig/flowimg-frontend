import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/sidebar";
import { SiteHeader } from "@/components/header";
import QueryProvider from "@/provider/queryProvider";
import { ThemeProvider } from "@/provider/themeProvider";
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlowImg: Simple & Fast Image Model API",
  description:
    "FlowImg is the simplest image model API provider built for speed, scale, and developers. Generate, transform, and optimize images with a clean, hassle-free API designed for modern ai apps.",
    icons: '/icon.svg'
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <ThemeProvider
         attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
        <QueryProvider>
        <SidebarProvider>
          
          <AppSidebar />
        <main className="flex flex-col w-full h-screen ">
          
          <SiteHeader />
          {children}
          <Toaster />
        </main>
        </SidebarProvider>
        </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
