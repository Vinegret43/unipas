import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Link from "next/link";
import { API_ADDRESS } from "./config";
const path = require("node:path");

function create_table_of_contents(contents) {
  let elements = [];

  for (let i = 0; i < contents.length; i++) {
    const article_path = path.join(
      "/study",
      path.relative("page", contents[i].path),
    );
    if (contents[i].hasOwnProperty("inner")) {
      const inner_contents = create_table_of_contents(contents[i].inner);
      elements.push(
        <li key={article_path}>
          <Link href={article_path}>
            {contents[i].name}
          </Link>
          <ol className="list-decimal list-inside ps-5 mt-2">
            {inner_contents}
          </ol>
        </li>
      );
    } else {
      elements.push(
        <li key={contents[i].path}>
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
    const posts = await result.json();
    const table_of_contents = create_table_of_contents(posts);
    return (
        <ResizablePanelGroup direction="horizontal" className="max-h-[100%]" autoSaveId="study">
          <ResizablePanel defaultSize={20}>{table_of_contents}</ResizablePanel>
          <ResizableHandle/>
          <ResizablePanel><div className="overflow-scroll max-h-[100%]">{children}</div></ResizablePanel>
        </ResizablePanelGroup>
    );
}
