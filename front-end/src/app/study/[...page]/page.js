import { Remarkable } from "remarkable";
import { API_ADDRESS } from "./config";
const path = require("node:path");

const md = new Remarkable();

export default async function Page({params}) {
    const page_path = path.join("page", (await params).page.join("/"));
    console.log(page_path);
    const result = await fetch(new URL(page_path, API_ADDRESS));
    const page_content = await result.text();
    const markup = {__html: md.render(page_content)};
    return (
        <div dangerouslySetInnerHTML={markup}></div>
    );
}
