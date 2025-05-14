import Link from 'next/link';

export default function MobileMenu() {
  return (
    <div className="mobile-menu">
      <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium">
        About Us
      </Link>
      <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium">
        Contact
      </Link>
      <Link href="/membership" className="block px-3 py-2 rounded-md text-base font-medium">
        Membership
      </Link>
    </div>
  );
}