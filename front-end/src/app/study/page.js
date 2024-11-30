'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const page_url = window.localStorage.getItem("study_page");
    if (page_url) {
      router.push(page_url);
    } else {
      router.push("/study/1-introduction.md");
    }
  });
}
