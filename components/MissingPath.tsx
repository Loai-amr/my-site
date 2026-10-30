"use client";

import { usePathname } from "next/navigation";

// The 404 page is a server component without access to the URL, so the path comes from the client.
export default function MissingPath() {
  const path = usePathname();
  return <>{path || "/"}</>;
}
