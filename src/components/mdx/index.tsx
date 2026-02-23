import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

export const mdxComponents: MDXComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-[var(--foreground)]"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="text-2xl font-display font-semibold tracking-tight text-[var(--foreground)]"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="text-xl font-display font-semibold tracking-tight text-[var(--foreground)]"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className="text-lg font-display font-semibold text-[var(--foreground)]"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className="text-[var(--text-secondary)] leading-relaxed"
      {...props}
    />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      className="text-[var(--accent)] underline text-underline-offset-2 hover:text-[var(--accent-light)] transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="text-[var(--foreground)] font-semibold" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => <em className="text-[var(--text-secondary)] italic" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => <blockquote className="guideline-quote" {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="text-[var(--text-secondary)] leading-relaxed list-disc pl-6 space-y-1"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="text-[var(--text-secondary)] leading-relaxed list-decimal pl-6 space-y-1"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="text-[var(--text-secondary)]" {...props} />,
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 overflow-x-auto text-sm leading-relaxed font-mono"
      tabIndex={0}
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => {
    const isInline = !props.className;
    if (isInline) {
      return (
        <code
          className="text-[var(--accent-light)] bg-[var(--surface)] px-1.5 py-0.5 rounded text-[0.875em] font-mono"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  hr: () => <hr className="border-0 h-px bg-[var(--border)] my-8" />,
};
