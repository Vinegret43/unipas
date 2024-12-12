import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent
} from "@/components/ui/sidebar"

export default function AppSidebar({children}) {
  return (
    <Sidebar className="app-sidebar">
      <SidebarHeader className="p-4">
        <img className="w-48" src="/icons/logo.svg"/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupContent>
              {children}
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
