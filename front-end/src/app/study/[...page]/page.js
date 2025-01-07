import { Remarkable } from "remarkable";
import hljs from '@/lib/highlight/highlight.js'

import StateSaver from "@/components/custom/state_saver";
import Player from "@/components/custom/player";
import Nav from "@/components/custom/nav";
import AppSidebar from "@/components/custom/app_sidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { notFound } from 'next/navigation';

const path = require("node:path");
import { promises as fs } from 'fs';

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

async function generate_pages_index(md_dir_path) {
    let index = [];
    for (const entry of await fs.readdir(md_dir_path, { withFileTypes: true })) {
        if (entry.name.match(/^[\._0]/)) {
            continue;
        }
        if (entry.isFile()) {
            let title;
            try {
                const contents = await fs.readFile(path.join(md_dir_path, entry.name), "utf8");
                title = contents.match(/^#[^#].*/)[0].replace('#', '').trim();
            } catch {
                continue;
            };
            index.push(
                {
                    title: title,
                    path: path.join(entry.name),
                }
            );
        } else if (entry.isDirectory()) {
            const sub_dir_path = path.join(md_dir_path, entry.name);
            const inner_index = await generate_pages_index(sub_dir_path);
            if (inner_index.length == 0) {
                continue;
            }
            let title;
            try {
                title = await fs.readFile(path.join(sub_dir_path, "title.txt"), "utf8");
                title = title.split()[0].trim();
            } catch (e) {
                continue;
            };
            inner_index.forEach((e) => (e.path = path.join(entry.name, e.path)))
            index.push(
                {
                    title: title,
                    inner: inner_index,
                    path: entry.name,
                }
            );
        }
    };
    return index;
}

var cached_index = null;
async function get_pages_index() {
    if (cached_index == null) {
        const markdown_dir_path = path.join(process.cwd(), 'public/md/');
        cached_index = await generate_pages_index(markdown_dir_path);
    }
    return cached_index;
};

async function file_exists(file_path) {
    try {
        await fs.access(file_path);
        return true;
    } catch {
        return false;
    }
}

export async function generateStaticParams() {
    let params = [];
    const markdown_dir_path = path.join(process.cwd(), 'public/md/');
    const index = await get_pages_index(markdown_dir_path);
    for (let i of index) {
        if (i.hasOwnProperty("inner")) {
            for (let k of i.inner) {
                params.push({page: k.path.split('/')})
            };
        } else {
            params.push({page: [i.path]});
        }
    };
    return params;
};

export default async function Page({params}) {
    const page_path = (await params).page;
    const markdown_dir_path = path.join(process.cwd(), 'public/md/');

    const markdown_file_path = path.join(markdown_dir_path, ...page_path);
    let raw_markdown;
    try {
        raw_markdown = await fs.readFile(markdown_file_path, "utf8");
    } catch {
        return notFound();
    };
    const html_markup = {__html: md.render(raw_markdown)};

    const pages_index = await get_pages_index()

    const audio_path = path.join('/audio', ...page_path).replace(/\.md$/, ".mp3");
    let audio_player;
    if (await file_exists(path.join(process.cwd(), "public", audio_path))) {
        audio_player = (<Player audio_path={audio_path}/>);
    }

    return (
        <SidebarProvider className='w-screen'>
            <AppSidebar posts={pages_index} cur_url={path.join(...page_path)}/>
            <div className="flex-1 grow min-w-0 flex flex-col max-h-screen">
                <Nav>
                    <SidebarTrigger/>
                </Nav>
                <div className="overflow-auto w-full">
                    <div className="w-full pt-4 pb-8">
                        <StateSaver/>
                        <div className="m-auto md:max-w-[1200px] pr-4 pl-4">
                            {audio_player}
                        </div>
                        <main
                            className="markdown m-auto md:max-w-[1200px] pl-4 pr-4"
                            dangerouslySetInnerHTML={html_markup}></main>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}
