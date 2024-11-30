'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'

export default function StateSaver() {
  const path = usePathname();
  useEffect(() => {
    window.localStorage.setItem("study_page", path);
  });
}
