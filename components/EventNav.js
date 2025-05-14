"use client";

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function EventNav({ events = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Safe navigation function
  const navigateSafely = (url) => {
    // Only navigate if the target URL is different from current path
    if (pathname !== url) {
      router.push(url);
    }
  };
  
  return (
    <nav className="mb-6">
      <ul className="flex flex-wrap gap-4">
        {events.map(event => (
          <li key={event.id}>
            {pathname === `/events/${event.id}` ? (
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded cursor-default">
                {event.title}
              </span>
            ) : (
              <button
                onClick={() => navigateSafely(`/events/${event.id}`)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
              >
                {event.title}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
