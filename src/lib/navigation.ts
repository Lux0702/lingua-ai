import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Languages,
  BookText,
  ClipboardCheck,
  Bot,
  ChartColumn,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    href: "/courses",
    icon: BookOpen,
  },
  // {
  //   title: "Lessons",
  //   href: "/lessons",
  //   icon: GraduationCap,
  // },
  // {
  //   title: "Vocabulary",
  //   href: "/vocabulary",
  //   icon: Languages,
  // },
  // {
  //   title: "Grammar",
  //   href: "/grammar",
  //   icon: BookText,
  // },
  {
    title: "Quiz",
    href: "/quiz",
    icon: ClipboardCheck,
  },
  {
    title: "AI Tutor",
    href: "/ai-tutor",
    icon: Bot,
  },
  // {
  //   title: "Progress",
  //   href: "/progress",
  //   icon: ChartColumn,
  // },
  // {
  //   title: "Settings",
  //   href: "/settings",
  //   icon: Settings,
  // },
];
