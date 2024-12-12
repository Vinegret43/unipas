import { Remarkable } from "remarkable";
import StateSaver from "./state_saver";
import { API_ADDRESS } from "./config";
const path = require("node:path");
import hljs from '@/lib/highlight/highlight.js'

const md = new Remarkable("full", {
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (err) {}
        }
     
        try {
            return hljs.highlightAuto(str).value;
        } catch (err) {}
     
        return '';
    },
});

export default async function Page({params}) {
    const page_path = path.join("page", (await params).page.join("/"));
    const result = await fetch(new URL(page_path, API_ADDRESS));
    const page_content = await result.text();
    const markup = {__html: md.render(page_content)};
    return (
        <div className="markdown w-full">
            <StateSaver/>
            <div className="m-auto md:max-w-[1200px] p-4" dangerouslySetInnerHTML={markup}></div>
        </div>
    );
}
