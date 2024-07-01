import { BotMessageSquare, PencilLine, SearchIcon } from "lucide-react";

export const MENU_LINKS = [
  {
    href: "/create-chatbot",
    label: "Create",
    subLabel: "New Chatbot",
    icon: BotMessageSquare,
  },
  {
    href: "/view-chatbots",
    label: "Edit",
    subLabel: "Chatbot",
    icon: PencilLine,
  },
  {
    href: "/review-sessions",
    label: "View",
    subLabel: "Sessions",
    icon: SearchIcon,
  },
];
