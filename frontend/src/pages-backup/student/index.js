// This is a placeholder page for index
// The original file is temporarily renamed during the build process
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function StudentIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to student dashboard
    router.push("/student/dashboard");
  }, [router]);

  return null;
}

// Skip static generation for this page
export const getStaticProps = () => {
  return { props: {} };
};
