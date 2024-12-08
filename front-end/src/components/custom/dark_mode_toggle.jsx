'use client'

import { Toggle } from "@/components/ui/toggle"
import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
    const [pressed, setPressed] = useState(false);

    function process_click(enabled) {
        setPressed(enabled);
        if (enabled) {
            window.localStorage.setItem("dark_mode", "true");
            document.body.classList.add("dark");
        } else {
            window.localStorage.setItem("dark_mode", "false");
            document.body.classList.remove("dark");
        }
    }

    useEffect(() => {
        if (window.localStorage.getItem("dark_mode") == "true") {
            setPressed(true);
            document.body.classList.add("dark");
        }
    });

    return (
        <Toggle pressed={pressed} onPressedChange={process_click}>
            <img src="/icons/dark_mode.svg" className="size-4 dark:invert"/>
        </Toggle>
    );
}

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { usePathname } from 'next/navigation'
//
// export default function StateSaver() {
//   const path = usePathname();
//   useEffect(() => {
//     window.localStorage.setItem("study_page", path);
//   });
// }
