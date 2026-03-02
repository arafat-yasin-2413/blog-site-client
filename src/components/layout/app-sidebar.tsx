import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import { Route } from "@/types";
import { Roles } from "@/constants/roles";


export function AppSidebar({
    user,
    ...props
}: {
    user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
    let routes: Route[] = [];

    switch (user.role) {
        case Roles.admin:
            routes = adminRoutes;
            break;

        case Roles.user:
            routes = userRoutes;
            break;
        default:
            routes = [];
            break;
    }

    return (
        <Sidebar {...props}>
            <SidebarContent>
                {routes.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton>
                                            {" "}
                                            {/* isActive={item.isActive} */}
                                            <Link href={item.url}>
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
