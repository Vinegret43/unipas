import { Remarkable } from "remarkable";
import StateSaver from "./state_saver";
import Player from "@/components/custom/player";
import { API_ADDRESS } from "@/config";
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
    const source_path = (await params).page.join("/");
    const page_path = path.join("page", source_path);
    const result = await fetch(new URL(page_path, API_ADDRESS));
    const page_content = await result.text();
    const markup = {__html: md.render(page_content)};

    const audio_path = path.join('/audio', source_path.replace(/\.md$/, ".mp3"));
    return (
        <div className="w-full pt-4 pb-8">
            <StateSaver/>
            <div className="m-auto md:max-w-[1200px] pr-4 pl-4">
                <Player audio_path={audio_path}/>
            </div>
            <div className="markdown m-auto md:max-w-[1200px] pl-4 pr-4" dangerouslySetInnerHTML={markup}></div>
        </div>
    );
}
