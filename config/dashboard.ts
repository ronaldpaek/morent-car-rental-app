import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Search Cars",
      href: "/search",
    },
    {
      title: "Add Car",
      href: "/add-car",
    },
  ],
  sidebarNav: [
    {
      title: "Profile",
      href: "/dashboard",
      icon: "user",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
