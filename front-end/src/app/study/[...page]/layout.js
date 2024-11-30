import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Link from "next/link";
import { API_ADDRESS } from "./config";
const path = require("node:path");

function create_table_of_contents(contents, cur_url) {
  let elements = [];

  for (let i = 0; i < contents.length; i++) {
    const article_path = path.join(
      "/study",
      path.relative("page", contents[i].path),
    );
    if (contents[i].hasOwnProperty("inner")) {
      const inner_contents = create_table_of_contents(contents[i].inner, cur_url);
      elements.push(
        <li className={(contents[i].path == cur_url) ? 'bg-accent' : null} key={article_path}>
          <Link href={article_path}>
            {contents[i].name}
          </Link>
          <ol className="list-decimal list-inside ps-5 mt-2 bg-background">
            {inner_contents}
          </ol>
        </li>
      );
    } else {
      elements.push(
        <li className={(contents[i].path == cur_url) ? 'bg-accent' : null} key={contents[i].path}>
          <Link href={article_path}>
            {contents[i].name}
          </Link>
        </li>
      );
    }
  };

  return (<ol className="list-decimal list-inside">{elements}</ol>);
}

export default async function Layout({children, params}) {
    const result = await fetch(new URL("index", API_ADDRESS));
    const cur_url = 'page/' + (await params).page.join("/");
    const posts = await result.json();
    const table_of_contents = create_table_of_contents(posts, cur_url);
    return (
        <ResizablePanelGroup direction="horizontal" className="max-h-[100%]" autoSaveId="study">
          <ResizablePanel className="overflow-scroll p-4" defaultSize={20}>{table_of_contents}</ResizablePanel>
          <ResizableHandle/>
          <ResizablePanel><div className="overflow-scroll max-h-[100%] pl-16 pr-16">{children}</div></ResizablePanel>
        </ResizablePanelGroup>
    );
}
