"use client";

import * as React from "react";
import {
  Frame,
  Compass,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react";
import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";
import { TeamSwitcher } from "@/components/team-switcher/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// This is sample data.
const data = {
  user: {
    name: "test user",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "WanderNest",
      logo: Compass,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Bookings",
      url: "/bookings",
      icon: SquareTerminal,
      isActive: true,
    },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({
  isCollapsed,
  onCollapse,
  ...props
}: {
  isCollapsed: boolean;
  onCollapse: () => void;
} & React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);
  const { isMobile, setOpenMobile } = useSidebar(); // Import this from the sidebar context

  const handleNavClick = (url: string) => {
    navigate(url);
    
    // Handle both desktop and mobile sidebar states
    if (isMobile) {
      setOpenMobile(false);
    } else {
      onCollapse();
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} onItemClick={handleNavClick}/>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} onItemClick={handleNavClick} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: auth.userName || "",
            email: auth.userEmail || "",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}