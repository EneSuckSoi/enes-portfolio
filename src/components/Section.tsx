"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

// Shared section frame: one panel per section, title on top, content below.
// The panel slides up into place the first time it scrolls into view.
export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Start once a slice of the panel is above the bottom edge
      { rootMargin: "0px 0px -12% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className="scroll-mt-24 px-4 sm:px-6">
      <div
        ref={panelRef}
        className={`reveal panel mx-auto max-w-5xl px-6 py-10 sm:px-12 sm:py-14 ${visible ? "is-visible" : ""}`}
      >
        <h2 className="text-[1.875rem] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[2.375rem]">
          {title}
        </h2>
        <div className="mt-8 sm:mt-10">{children}</div>
      </div>
    </section>
  );
}
