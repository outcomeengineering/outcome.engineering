export default function Footer() {
  return (
    <footer className="mt-auto px-6 py-12 border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--text-muted)]">
        <p>
          Outcome Engineering is open source under the{" "}
          <a
            href="https://github.com/outcomeengineering/outcome.engineering/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="link-muted"
            aria-label="MIT License (opens in new tab)"
          >
            MIT License
          </a>
          .
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/outcomeengineering/outcome.engineering"
            target="_blank"
            rel="noopener noreferrer"
            className="link-muted"
            aria-label="GitHub repository (opens in new tab)"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
