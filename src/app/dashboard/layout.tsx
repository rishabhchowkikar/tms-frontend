'use client'

import React, { useEffect } from 'react'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/common/Sidebar'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    const { isAuth, isInitialized } = useSelector((s: RootState) => s.auth)

    useEffect(() => {
        if (isInitialized && !isAuth) {
          router.replace('/login')
        }
      }, [isAuth, isInitialized, router])
    
      if (!isInitialized) return null

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-background">
                <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background px-4">
                    <SidebarTrigger />
                    <div className="flex-1" />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 bg-background text-foreground">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Layout