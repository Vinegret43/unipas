import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar"
import DarkModeToggle from "@/components/custom/dark_mode_toggle"

export default function Nav({children}) {
    return (
        <nav className="relative flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          {children}
          <DarkModeToggle/>
        </nav>
    )
}
