import { ReactNode } from "react";

// Shared section frame: a sticky title in the left rail, content on the right.
export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-line py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 md:grid-cols-[11rem_1fr] md:gap-12">
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink md:sticky md:top-24 md:self-start">
          {title}
        </h2>
        <div className="max-w-2xl">{children}</div>
      </div>
    </section>
  );
}
