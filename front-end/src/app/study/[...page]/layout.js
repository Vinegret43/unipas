import Link from "next/link";
import { API_ADDRESS } from "./config";
import Nav from "@/components/custom/nav";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import AppSidebar from "@/components/custom/app_sidebar";

const path = require("node:path");

function SidebarLink({href, active, children}) {
  return (<Link
    href={href}
    className={'hover:text-primary ' + (active ? 'underline text-primary' : 'no-underline text-foreground')}
  >
    {children}
  </Link>)
}

function create_table_of_contents(contents, cur_url) {
  let elements = [];
  cur_url = '/study/' + cur_url;
  console.log(cur_url);

  for (let i = 0; i < contents.length; i++) {
    const article_path = path.join(
      "/study",
      path.relative("page", contents[i].path),
    );
    if (contents[i].hasOwnProperty("inner")) {
      let children = [];
      for (let k = 0; k < contents[i].inner.length; k++) {
        const inner_article_path = path.join(
          "/study",
          path.relative("page", contents[i].inner[k].path),
        );
        children.push(
          <SidebarMenuSubItem className="sidebar-item" key={inner_article_path}>
              <SidebarLink href={inner_article_path} active={inner_article_path==cur_url}>
                {contents[i].inner[k].name}
              </SidebarLink>
          </SidebarMenuSubItem>
        );
      };

      elements.push(
        <SidebarMenuItem className="sidebar-item" key={article_path}>
            {contents[i].name}
          <SidebarMenuSub>
            {children}
          </SidebarMenuSub>
        </SidebarMenuItem>
      );
    } else {
      elements.push(
        <SidebarMenuItem className="sidebar-item" key={article_path}>
            <SidebarLink href={article_path} active={article_path==cur_url}>
              {contents[i].name}
            </SidebarLink>
        </SidebarMenuItem>
      );
    }
  };

  return (<SidebarMenu>{elements}</SidebarMenu>);
}

export default async function Layout({children, params}) {
    const result = await fetch(new URL("index", API_ADDRESS));
    const cur_url = (await params).page.join("/");
    const posts = await result.json();
    const table_of_contents = create_table_of_contents(posts, cur_url);
    return (
      <SidebarProvider className='w-screen'>
        <AppSidebar>
          {table_of_contents}
        </AppSidebar>
        <main className="flex-1 grow min-w-0 flex flex-col max-h-screen">
          <Nav><SidebarTrigger/></Nav>
          <div className="overflow-auto w-full">
            {children}
          </div>
        </main>
      </SidebarProvider>
    );
}
