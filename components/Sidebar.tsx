import { BotMessageSquare, PencilLine, SearchIcon } from "lucide-react";
import Link from "next/link";
import { MENU_LINKS } from "@/constants";

export default function Sidebar() {
  return (
    <nav className="lg:h-full bg-white">
      <ul className="gap-5 p-5 flex lg:flex-col">
        {MENU_LINKS.map((link, index) => {
          return (
            <li className="flex-1" key={index}>
              <Link
                href={link.href}
                className="hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-primary text-primary-foreground"
              >
                <link.icon className="h-6 w-6 lg:h-8 lg:w-8" />
                <div className="hidden md:inline">
                  <p className="text-xl">{link.label}</p>
                  <p className="text-sm font-extralight">{link.subLabel}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
