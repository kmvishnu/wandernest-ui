"use client";

import * as React from "react";
import {
  Frame,
  Compass,
  Map,
  PieChart,
  Settings2,
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
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

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
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
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

  const handleNavClick = (url: string) => {
    navigate(url);
    onCollapse(); // Collapse the sidebar when an item is clicked
  };

  return (
    <Sidebar
      collapsible={isCollapsed ? "icon" : undefined} // Ensure correct type
      className={`transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} onItemClick={handleNavClick} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}