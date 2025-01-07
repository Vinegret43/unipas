import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import Link from 'next/link';

const path = require("node:path");

function SidebarLink({href, active, children}) {
  return (<Link
    href={href}
    className={'leading-tight hover:text-primary ' + (active ? 'underline text-primary' : 'no-underline text-foreground')}
  >
    {children}
  </Link>)
}

function create_table_of_contents(posts, cur_url) {
  let elements = [];
  cur_url = '/study/' + cur_url;

  for (let i = 0; i < posts.length; i++) {
    const article_path = path.join(
      "/study",
      posts[i].path,
    );
    if (posts[i].hasOwnProperty("inner")) {
      let children = [];
      for (let k = 0; k < posts[i].inner.length; k++) {
        const inner_article_path = path.join(
          "/study",
          posts[i].inner[k].path,
        );
        children.push(
          <SidebarMenuSubItem className="mb-2" key={inner_article_path}>
              <SidebarLink href={inner_article_path} active={inner_article_path==cur_url}>
                {k+1}.{posts[i].inner[k].title}
              </SidebarLink>
          </SidebarMenuSubItem>
        );
      };

      elements.push(
        <SidebarMenuItem className="mb-2" key={article_path}>
            {i+1}.{posts[i].title}
          <SidebarMenuSub>
            {children}
          </SidebarMenuSub>
        </SidebarMenuItem>
      );
    } else {
      elements.push(
        <SidebarMenuItem className="mb-2" key={article_path}>
            <SidebarLink href={article_path} active={article_path==cur_url}>
              {i+1}.{posts[i].title}
            </SidebarLink>
        </SidebarMenuItem>
      );
    }
  };

  return (<SidebarMenu>{elements}</SidebarMenu>);
}

export default function AppSidebar({posts, cur_url}) {
  const table_of_contents = create_table_of_contents(posts, cur_url);
  return (
    <Sidebar className="app-sidebar">
      <SidebarHeader className="p-4">
        <img className="w-48" src="/icons/logo.svg"/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupContent>
              {table_of_contents}
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
