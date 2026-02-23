# Outcome Engineering Docs

Documentation site for the Outcome Engineering methodology, hosted at docs.outcome.engineering.

## Project Identity

- **Brand name**: Outcome Engineering
- **Domain**: docs.outcome.engineering
- **GitHub org**: Outcome Engineering
- **Repository**: [outcomeengineering/outcome.engineering](https://github.com/outcomeengineering/outcome.engineering)
- **Platform**: Mintlify

## IMPORTANT RULES

1. **Never use Claude as commit author.** All commits must use the repository owner's git identity (`Simon Heimlicher <simon.github@heimlicher.com>`), not Claude or any AI assistant.

## Core Positioning

Outcome Engineering is a methodology for spec-driven development with AI agents. The Spec Tree is a git-native product structure with outcome hypotheses, drift detection via lock files, and deterministic context injection.

## Content Structure

Two tabs: Guide (conceptual narrative) and Reference (technical specifications).

```
mintlify/
├── docs.json                    # Mintlify configuration
├── index.mdx                    # Homepage
├── guide/
│   ├── overview.mdx             # From outputs to outcomes
│   ├── spec-tree.mdx            # What the Spec Tree is
│   ├── nodes.mdx                # What a node looks like
│   ├── building.mdx             # Index numbering, growing the tree
│   ├── deterministic-context.mdx # Context injection
│   ├── lock-files.mdx           # Drift detection
│   ├── operational-loop.mdx     # spx status/lock/verify
│   ├── guidelines.mdx           # Three guidelines
│   ├── testing.mdx              # Testing philosophy
│   └── agent-skills.mdx         # Skill layers
└── reference/
    ├── node-types.mdx           # Enabler, outcome, product, decisions
    ├── index-numbering.mdx      # Sparse integer distribution
    ├── node-states.mdx          # Valid, stale, needs work
    ├── filesystem.mdx           # Naming conventions
    ├── lock-file.mdx            # spx-lock.yaml schema
    ├── assertions.mdx           # Assertion format
    ├── spx-cli.mdx              # Command reference
    └── context-injection.mdx    # Injection algorithm
```

## Authoritative Source

`spec-tree.md` is the authoritative source for the current model. Key terminology:

- Two node types: **enabler** and **outcome** (not capability/feature/story)
- Numeric prefixes are called **index** (not BSP)
- Only lock file is **spx-lock.yaml**
- Tree relationships: ancestors, parents, siblings, children, descendants

## Development

```bash
npm i -g mint
mint dev
```

Preview at http://localhost:3000
