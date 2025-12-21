'use client'

import * as React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from '@/components/ui/sidebar'
import {
    ChevronDown,
    ChevronRight,
    Code2,
    FileText,
    History,
    Settings,
    Star,
    Bot,
    Building2,
    User,
    ChevronsUpDown,
    LogOut,
} from 'lucide-react'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { logoutUser } from "@/store/authSlice"
import { AnyAction } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
const menuItems = [
    {
        title: 'Playground',
        icon: Code2,
        items: [
            { title: 'History', icon: History },
            { title: 'Starred', icon: Star },
            { title: 'Settings', icon: Settings },
        ],
    },
    {
        title: 'Models',
        icon: Bot,
    },
    {
        title: 'Documentation',
        icon: FileText,
    },
    {
        title: 'Settings',
        icon: Settings,
    },
]

export function AppSidebar() {
    const [openItems, setOpenItems] = React.useState<string[]>(['playground'])
    const { user, isLoading } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch();
    const router = useRouter();
    const toggleItem = (item: string) => {
        setOpenItems((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        )
    }

    const handleLogout = () => {
        dispatch(logoutUser() as unknown as AnyAction).unwrap().then(() => {
            router.push('/login');
            toast.success('Logged out successfully');
        }).catch((error: any) => {
            toast.error(error.message);
        })
    }

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <div className="flex items-center gap-2 px-2 py-1.5">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Building2 className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">TMS</span>
                                    <span className="truncate text-xs text-sidebar-foreground/70">
                                        HR Roadways
                                    </span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    {item.items ? (
                                        <>
                                            <SidebarMenuButton
                                                onClick={() => toggleItem(item.title.toLowerCase())}
                                                isActive={openItems.includes(item.title.toLowerCase())}
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                                {openItems.includes(item.title.toLowerCase()) ? (
                                                    <ChevronDown className="ml-auto" />
                                                ) : (
                                                    <ChevronRight className="ml-auto" />
                                                )}
                                            </SidebarMenuButton>
                                            {openItems.includes(item.title.toLowerCase()) && (
                                                <SidebarMenuSub>
                                                    {item.items.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <SidebarMenuSubButton asChild>
                                                                <a href="#">
                                                                    <span>{subItem.title}</span>
                                                                </a>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            )}
                                        </>
                                    ) : (
                                        <SidebarMenuButton asChild>
                                            <a href="#">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <div className="flex items-center gap-2 px-2 py-1.5">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                                    <User className="size-4" />
                                </div>
                                {isLoading ? (<>
                                    <div className="h-4 w-24 rounded bg-white/20 animate-pulse" />
                                    <div className="mt-1 h-3 w-36 rounded bg-white/10 animate-pulse" />
                                </>) : (<>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user?.adminname}</span>
                                        <span className="truncate text-xs text-sidebar-foreground/70">
                                            {user?.email}
                                        </span>
                                    </div>
                                </>)}
                                {/* <ChevronsUpDown className="ml-auto size-4" /> */}
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        {isLoading ? (<>
                            <div className="h-4 w-24 rounded bg-white/20 animate-pulse" />
                            <div className="mt-1 h-3 w-36 rounded bg-white/10 animate-pulse" />
                        </>) : (<>
                            <SidebarMenuButton
                                onClick={handleLogout}
                                disabled={isLoading}
                                className="w-full cursor-pointer"
                                aria-disabled={!user?.id}
                            >
                                <LogOut className="size-4" />
                                <span>Logout</span>
                            </SidebarMenuButton>
                        </>)}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar