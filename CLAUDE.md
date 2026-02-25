# Outcome Engineering

A methodology for spec-driven development with AI agents, centered on the Spec Tree.

## Project Identity

- **Brand name**: Outcome Engineering
- **Domain**: outcome.engineering (landing page + blog), docs.outcome.engineering (Mintlify docs)
- **GitHub org**: Outcome Engineering
- **Repository**: https://github.com/outcomeengineering/outcome.engineering

## IMPORTANT RULES

1. **Never use Claude as commit author.** All commits must use the repository owner's git identity (`Simon Heimlicher <simon.github@heimlicher.com>`), not Claude or any AI assistant. This applies to all commits, including initial commits, amendments, and rebases.
2. **Validation must pass before committing.** Run `spx validation all` and ensure it is clean before every commit.

## Development Workflow

Follow this collaboration workflow for all changes:

1. **Feature branch**: Create a new branch for each change (related changes can be grouped)
2. **Local development**: Develop on the feature branch, user validates via `pnpm dev`
3. **Validate**: Run `spx validation all` — must be clean before committing or pushing
4. **Push and PR**: On user approval, push to GitHub and open a PR
   - Assign `simonheimlicher` as reviewer
   - Add comment `/gemini review` to trigger Gemini review
   - `@claude` review triggers automatically via GitHub Action
5. **Address reviews**: Wait for AI reviews, then address suggested changes
   - Use separate commits for successful changes
   - Squash multiple failed attempts into clean commits
6. **Final review**: User reviews and determines if ready to merge to main

## Core Positioning

Outcome Engineering is a methodology for building software with AI agents. The Spec Tree is a git-native product structure where each node co-locates a spec, its tests, and a lock file — tracking not just what changed, but what has been validated and whether that validation is still current.

The methodology addresses three failure modes of agentic development:

1. **Value drift** — specs capture only what to build, not why it exists
2. **Heuristic context** — agents grep for keywords instead of receiving deterministic context
3. **Spec-test drift** — the binding between specs and tests decays with every change

## The Spec Tree

- Two node types: **enabler** (`.enabler` — infrastructure) and **outcome** (`.outcome` — hypotheses with testable assertions)
- Product file at root: `{name}.product.md`
- Decision records: ADR (architecture) and PDR (product) as files within directories
- Numeric prefix (index) encodes dependency order — lower index = dependency for higher-index siblings
- Lock file (`spx-lock.yaml`) uses Git blob hashes to bind spec content to test evidence

## Site Structure

### Landing page (outcome.engineering) — Next.js

```
Home
├── Hero (tagline + 3D Spec Tree visualization)
├── The Problem (three failure modes)
├── The Solution (Spec Tree concept)
├── Guidelines (always converging, determinism, ask what matters)
├── Operational Loop (spx status/lock/verify)
├── Interactive Spec Tree Explorer
└── CTA (docs + GitHub)
```

### Blog (outcome.engineering/blog) — Next.js + MDX

Blog posts about the methodology. First post: "Growing a Spec Tree for Deterministic Context."

### Docs (docs.outcome.engineering) — Mintlify

Source lives in the `mintlify/` folder in this repo. Published to docs.outcome.engineering.

```
Guide tab
├── Getting Started (overview, spec tree, nodes)
├── Structure (building, deterministic context, lock files)
└── Practice (operational loop, guidelines, testing, agent skills)

Reference tab
├── Spec Tree (node types, index numbering, node states)
├── Files (filesystem, lock file, assertions)
└── Tooling (spx CLI, context injection)
```

## Tech Stack

- Next.js 15
- TypeScript
- pnpm
- TailwindCSS 4
- Mintlify (docs subdomain)
- MIT License

## Design System

- Dark theme: background `#0c0a09`, foreground `#fafafa`
- Amber accent: `#f59e0b`
- Typography: Fira Code (monospace)
- Glassmorphism cards with backdrop blur
- Node state colors: green (valid), amber (stale), muted gray (needs work)

## Playwright MCP Screenshots

When using Playwright MCP's `browser_take_screenshot`, **always set the `filename` parameter** to a task-specific subdirectory under `.playwright-mcp/`. Never save screenshots to the project root.

Format: `.playwright-mcp/<task-slug>/<descriptive-name>.png`

Example: `.playwright-mcp/feat-landing-page/hero-initial-state.png`

## CI/CD

GitHub Actions workflows in `.github/workflows/` use reusable workflows from [spx-gh-actions](https://github.com/simonheimlicher/spx-gh-actions):

- **`claude.yml`** — Interactive Claude assistant triggered by `@claude` mentions on issues and PRs
- **`claude-code-review.yml`** — Automatic code review on pull request open/synchronize

Both require the `CLAUDE_CODE_OAUTH_TOKEN` repository secret (configured).

## Related Work

- [spx-cli](https://github.com/simonheimlicher/spx-cli) — CLI tool for managing the Spec Tree
- [spx-claude](https://github.com/simonheimlicher/spx-claude) — Claude Code plugin marketplace for Outcome Engineering
- [spx-gh-actions](https://github.com/simonheimlicher/spx-gh-actions) — GitHub Actions for Outcome Engineering workflows
