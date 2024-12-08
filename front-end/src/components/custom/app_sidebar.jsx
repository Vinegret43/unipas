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
      <SidebarHeader>UNIPAS</SidebarHeader>
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
