
// This is a placeholder page for index
// The original file is temporarily renamed during the build process
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function IndexPage() {
  const router = useRouter();
  
  useEffect(() => {
    // In real environment, redirect to login
    router.push('/login');
  }, [router]);
  
  return null;
}

// Skip static generation for this page
export const getStaticProps = () => {
  return { props: {} };
}
