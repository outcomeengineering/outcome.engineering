# Outcome Engineering

A methodology for spec-driven development with AI agents.

**[outcome.engineering](https://outcome.engineering)**

## What is this?

Outcome Engineering centers on the **Spec Tree** — a git-native product structure where each node co-locates a spec, its tests, and a lock file. The tree addresses three failure modes of agentic development: value drift, heuristic context, and spec-test drift.

Every node begins with an outcome hypothesis — a belief about what change it will produce. Assertions define testable claims about the output. Lock files use Git blob hashes to bind spec content to test evidence, making drift visible before anyone runs a test.

The tree structure enables deterministic context injection: the path from root to any node defines exactly what context an agent receives, replacing heuristic search with curated, reviewable context.

## Key concepts

- **Spec Tree** — git-native product structure in `spx/`
- **Enabler nodes** (`.enabler`) — infrastructure that higher-index nodes depend on
- **Outcome nodes** (`.outcome`) — hypotheses with testable assertions
- **Lock file** (`spx-lock.yaml`) — Git blob hashes binding spec to test evidence
- **Deterministic context injection** — tree structure defines agent context

## Development

```bash
pnpm install
pnpm dev
```

## License

MIT
