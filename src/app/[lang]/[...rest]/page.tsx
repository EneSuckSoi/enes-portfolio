import { notFound } from "next/navigation";

// Catch unknown paths under /en or /tr so they render [lang]/not-found.tsx inside the site layout
export default function CatchAll() {
  notFound();
}
