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
} from 'lucide-react'
import { cn } from '@/lib/utils'

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

    const toggleItem = (item: string) => {
        setOpenItems((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        )
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
                                    <span className="truncate font-semibold">Acme Inc</span>
                                    <span className="truncate text-xs text-sidebar-foreground/70">
                                        Enterprise
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
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">shadcn</span>
                                    <span className="truncate text-xs text-sidebar-foreground/70">
                                        m@example.com
                                    </span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar