import { ReactNode } from "react";

// Shared section frame: one panel per section, title on top, content below.
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
    <section id={id} className="scroll-mt-24 px-4 sm:px-6">
      <div className="panel mx-auto max-w-5xl px-6 py-10 sm:px-12 sm:py-14">
        <h2 className="font-serif text-[2rem] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[2.5rem]">
          {title}
        </h2>
        <div className="mt-8 max-w-3xl sm:mt-10">{children}</div>
      </div>
    </section>
  );
}
