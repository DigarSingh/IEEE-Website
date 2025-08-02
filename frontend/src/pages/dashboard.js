// This is a placeholder page for dashboard
// The original file is temporarily renamed during the build process
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function DashboardPage() {}

// Skip static generation for this page
export const getStaticProps = () => {
  return { props: {} };
};
