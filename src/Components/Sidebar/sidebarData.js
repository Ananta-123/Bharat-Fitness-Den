import {
  Image,
  ChartNoAxesCombined ,
  CalendarClock,
  ClipboardList,
  Package ,
  LayoutDashboard,
  Users,
  Dumbbell,
  Target,
  Building2,
  CreditCard,
  Activity,
  Apple,
  Pill,
  ShoppingCart,
  BadgePercent,
  Bell,
  BarChart3,
  Settings,
} from "lucide-react";

export const sidebarData = [
  {
    title: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    path: "/users",
    icon: Users,
  },
  {
    title: "Trainers",
    path: "/trainers",
    icon: Dumbbell,
  },
  {
    title: "Branches",
    path: "/branches",
    icon: Building2,
  },
  {
    title: "Subscriptions",
    path: "/subscriptions",
    icon: CreditCard,
  },
  {
    title: "Goal Groups",
    path: "/goalgroups",
    icon: Target,
  },
   {
    title: "Workouts Sessions",
    path: "/workouts-sessions",
    icon: CalendarClock,
  },
  {
    title: "Workouts",
    path: "/workouts",
    icon: Activity,
  },
  {
    title: "User Workouts",
    path: "/user-workouts",
    icon: ClipboardList,
  },
  {
    title: "Diet Plans",
    path: "/diet-plans",
    icon: Apple,
  },
  {
    title: "Supplements",
    path: "/supplements",
    icon: Pill,
  },
  {
    title: "Orders",
    path: "/orders",
    icon: Package ,
  },
  {
    title: "Offers",
    path: "/offers",
    icon: BadgePercent,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    title: "Banners",
    path: "/banners",
    icon: Image,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    title: "Carts",
    path: "/carts",
    icon: ShoppingCart,
  },
   {
    title: "Analytics",
    path: "/analytics",
    icon: ChartNoAxesCombined ,
  },
];