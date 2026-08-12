import {
  Image,
  ChartNoAxesCombined,
  CalendarClock,
  ClipboardList,
  Package,
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
    category: "OVERVIEW",
    items: [
      {
        title: "Dashboard",
        path: "/",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    category: "TRAINING",
    items: [
      {
        title: "Workouts",
        path: "/workouts",
        icon: Activity,
      },
      {
        title: "Exercise",
        path: "/exercise",
        icon: Dumbbell,
      },
      // {
      //   title: "Workouts Sessions",
      //   path: "/workouts-sessions",
      //   icon: CalendarClock,
      // },
      // {
      //   title: "User Workouts",
      //   path: "/user-workouts",
      //   icon: ClipboardList,
      // },
    ],
  },

  {
    category: "NUTRITION",
    items: [
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
        title: "Goal Groups",
        path: "/goalgroups",
        icon: Target,
      },
    ],
  },

  {
    category: "PEOPLE",
    items: [
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
        title: "Subscription Plans",
        path: "/subscriptions",
        icon: CreditCard,
      },
    ],
  },

  {
    category: "COMMERCE",
    items: [
      {
        title: "Products",
        path: "/supplements",
        icon: Package,
      },
      {
        title: "Order",
        path: "/carts",
        icon: ShoppingCart,
      },
      {
        title: "Offers & Coupons",
        path: "/offers",
        icon: BadgePercent,
      },
      
    ],
  },

  {
    category: "CONTENT",
    items: [
      {
        title: "Banners",
        path: "/banners",
        icon: Image,
      },
      // {
      //   title: "Notifications",
      //   path: "/notifications",
      //   icon: Bell,
      // },
    ],
  },

  {
    category: "INSIGHTS",
    items: [
      {
        title: "Reports",
        path: "/reports",
        icon: BarChart3,
      },
      
    ],
  },
];