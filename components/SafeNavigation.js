"use client";

import { useRouter, usePathname } from 'next/navigation';

export function useSafeNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  
  const navigateTo = (url) => {
    // Don't navigate if we're already on the target URL
    if (pathname !== url) {
      router.push(url);
    }
  };
  
  return navigateTo;
}
