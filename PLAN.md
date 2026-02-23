# PLAN: Transform outcome.engineering for Outcome Engineering

## Context

This repository hosts the **Outcome Engineering** methodology site at `outcome.engineering` (landing page + blog) and `docs.outcome.engineering` (Mintlify docs). The site was originally built for "Agent prompt" (prompts.ag) and is being repurposed.

Outcome Engineering is a methodology for spec-driven development with AI agents. The **Spec Tree** is a git-native product structure where each node co-locates a spec, its tests, and a lock file — tracking not just what changed, but what has been validated and whether that validation is still current.

### Authoritative source

`spec-tree.md` at `/Users/shz/Code/spx/spx-claude/methodology/outcome-engineering/posts/01-spec-tree/spec-tree.md` defines the current model. Other methodology files contain useful concepts but may use outdated terminology.

### Current model terminology

- **Spec Tree**: git-native product structure in `spx/` directory
- **Two node types**: enabler (`.enabler` — infrastructure) and outcome (`.outcome` — hypotheses with testable assertions)
- **Product file**: `{name}.product.md` at root of `spx/`
- **Decision records**: ADR (architecture) and PDR (product) as files within directories
- **Index**: Numeric prefix encoding dependency order. Sparse integer distribution — NOT "BSP"
- **Lock file**: `spx-lock.yaml` — Git blob hashes binding spec to test evidence
- **Node states**: valid, stale, needs work (no lock file)
- **Tree relationships**: ancestors, parents, siblings, children, descendants — NOT capability/feature/story

### Architecture

| Domain                   | Stack                      | Purpose                                                       |
| ------------------------ | -------------------------- | ------------------------------------------------------------- |
| outcome.engineering      | Next.js 15 + TailwindCSS 4 | Landing page with scroll-driven 3D Spec Tree animation + blog |
| docs.outcome.engineering | Mintlify                   | Methodology docs with Guide + Reference tabs                  |

### Design system (kept from original)

- Dark theme: background `#0c0a09`, foreground `#fafafa`
- Amber accent: `#f59e0b`
- Typography: Fira Code (monospace via Google Fonts, weights 400/500/700)
- Glassmorphism cards with backdrop blur
- Staggered fade-in animations on load
- Grid background + noise overlay

---

## Phase 1: Foundation — COMPLETED

Removed all Agent prompt content, updated branding, created clean shell.

### Files modified

| File                        | Change                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `CLAUDE.md`                 | Rewritten: Outcome Engineering identity, Spec Tree description, site structure, design system, related repos |
| `README.md`                 | Rewritten: OE overview, key concepts, dev commands                                                           |
| `src/app/layout.tsx`        | Updated: title "Outcome Engineering — Spec-driven development for AI agents", OE description, new keywords   |
| `src/app/page.tsx`          | Replaced: Agent prompt cards → OE cards (Guide, Reference, Blog, GitHub) with OE tagline                     |
| `src/components/Footer.tsx` | Updated: removed AGENTS.md link, added Docs + GitHub links                                                   |
| `mintlify/docs.json`        | Rewritten: two-tab navigation (Guide + Reference), updated name/description                                  |
| `mintlify/index.mdx`        | Rewritten: OE homepage with Spec Tree example and quick links                                                |
| `mintlify/CLAUDE.md`        | Rewritten: docs.outcome.engineering scope, content structure, authoritative source note                      |

### Files to delete (manual cleanup)

Old Agent prompt content that is no longer referenced but still on disk:

```
src/components/ProblemSection.tsx      # old Agent prompt problem section
src/components/ApproachSection.tsx     # "Why we don't benchmark"
src/components/FormatSection.tsx       # .ag format description
src/components/WhatAgentsWantSection.tsx # XML tag guidelines
src/components/ToolingSection.tsx      # .ag tooling roadmap
mintlify/walkthrough.mdx              # "Markdown in XML tags"
mintlify/approach.mdx                 # "Why we don't benchmark"
mintlify/cli.mdx                      # .ag tooling roadmap
mintlify/methodology.mdx             # .ag format spec
mintlify/specs/                       # old Mintlify migration specs (entire directory)
specs/prompts-ag.prd.md               # old Agent prompt PRD
specs/work/done/                      # old completed work items
```

### Files kept

| File                                | Reason                                                                              |
| ----------------------------------- | ----------------------------------------------------------------------------------- |
| `src/components/Section.tsx`        | Reusable section wrapper (id, title, children, center, maxWidthClass)               |
| `src/components/DocCard.tsx`        | Glassmorphism card with hover animation                                             |
| `src/components/CodeExample.tsx`    | Code block with copy button (client component)                                      |
| `src/components/Wordmark.tsx`       | SVG wordmark with glow animation                                                    |
| `src/components/icons/CopyIcon.tsx` | SVG copy icon                                                                       |
| `src/app/globals.css`               | Full design system (CSS variables, animations, glassmorphism, buttons, grid, noise) |
| `specs/design/DESIGN_LANGUAGE.md`   | Design language reference                                                           |

---

## Phase 2: Docs Content (Mintlify) — COMPLETED

Created 18 documentation pages organized in two tabs.

### Guide tab (10 pages)

| File                                       | Title                           | Content summary                                                                                                                                                                                       |
| ------------------------------------------ | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mintlify/guide/overview.mdx`              | From outputs to outcomes        | Three failure modes (value drift, heuristic context, spec-test drift), why specs are not for planning                                                                                                 |
| `mintlify/guide/spec-tree.mdx`             | The Spec Tree                   | What it is, why git-native, two node types, full tree example, product file, bounded growth                                                                                                           |
| `mintlify/guide/nodes.mdx`                 | What a node looks like          | Outcome specs (`## Outcome`), enabler specs (`## Enables`), assertions with test links, cross-cutting assertions, decision records                                                                    |
| `mintlify/guide/building.mdx`              | Building the tree               | Product file → decisions → enablers → outcomes. Sparse integer distribution formula. Fractional indexing. Growth examples                                                                             |
| `mintlify/guide/deterministic-context.mdx` | Deterministic context injection | Algorithm (walk path, inject lower-index siblings), full worked example for `54-spx-tree-interpretation.outcome/43-status-rollup.outcome`, payload as architecture signal, designed for tree browsers |
| `mintlify/guide/lock-files.mdx`            | Lock files                      | spx-lock.yaml format, how drift becomes visible, determinism, merge strategy, scope, content-addressable hashes                                                                                       |
| `mintlify/guide/operational-loop.mdx`      | The operational loop            | spx status / lock / verify / verify --fix with full terminal output examples. Uses Mintlify Steps component                                                                                           |
| `mintlify/guide/guidelines.mdx`            | Guidelines                      | Always be converging, Determinism unless creation is the goal, Ask what matters — each with blockquote + explanation                                                                                  |
| `mintlify/guide/testing.mdx`               | Testing                         | Three test levels (L1/L2/L3) in Mintlify Tabs, 4-part progression, trust the library, debuggability. Source: testing-foundation.md                                                                    |
| `mintlify/guide/agent-skills.mdx`          | Agent skills                    | Three layers (foundation/action/contract), specific skills per layer, 7-step conversational flow. Source: skill-structure.md                                                                          |

### Reference tab (8 pages)

| File                                       | Title                  | Content summary                                                                                                                                  |
| ------------------------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mintlify/reference/node-types.mdx`        | Node types             | Product file, enabler nodes, outcome nodes, ADR, PDR — each with filename conventions and examples                                               |
| `mintlify/reference/index-numbering.mdx`   | Index numbering        | Sparse integer distribution formula ($i_k = 10 + \lfloor k \times 89/(N+1) \rfloor$), table for N=3/5/7, fractional indexing, scope              |
| `mintlify/reference/node-states.mdx`       | Node states            | State table (valid/stale/needs work), computation rules, subtree state rollup, state transitions                                                 |
| `mintlify/reference/filesystem.mdx`        | Filesystem conventions | Directory naming, spec file naming, decision record naming, product file naming, test directory, test file naming, lock file location            |
| `mintlify/reference/lock-file.mdx`         | Lock file reference    | spx-lock.yaml schema with field table, key properties (deterministic, content-addressable, no timestamps, scoped), when written, merge conflicts |
| `mintlify/reference/assertions.mdx`        | Assertions             | Format, test file link syntax, coverage invariant, who writes what (human: hypothesis+assertions, agent: tests+implementation), cross-cutting    |
| `mintlify/reference/spx-cli.mdx`           | spx CLI                | spx status, spx lock, spx verify, spx verify --fix — each with usage, description, and terminal output example                                   |
| `mintlify/reference/context-injection.mdx` | Context injection      | 4-step algorithm, inclusion/exclusion table, full worked example, properties (deterministic, reviewable, architectural signal)                   |

### Mintlify navigation structure (`docs.json`)

```
Guide tab
├── Getting Started
│   ├── index (homepage)
│   ├── guide/overview
│   ├── guide/spec-tree
│   └── guide/nodes
├── Structure
│   ├── guide/building
│   ├── guide/deterministic-context
│   └── guide/lock-files
└── Practice
    ├── guide/operational-loop
    ├── guide/guidelines
    ├── guide/testing
    └── guide/agent-skills

Reference tab
├── Spec Tree
│   ├── reference/node-types
│   ├── reference/index-numbering
│   └── reference/node-states
├── Files
│   ├── reference/filesystem
│   ├── reference/lock-file
│   └── reference/assertions
└── Tooling
    ├── reference/spx-cli
    └── reference/context-injection
```

---

## Phase 3: Landing Page Content — TODO

Build the Outcome Engineering landing page with static content sections. The page tells the methodology story through a scroll-driven narrative. Scroll animation is deferred to Phase 5; this phase creates the static content and layout.

### New components to create

Each component uses the existing `Section.tsx` wrapper and design system patterns.

#### `src/components/HeroSection.tsx`

- Content: "Outcome Engineering" tagline, value proposition, CTA buttons (docs + GitHub)
- Reserve a `<div>` placeholder for the future 3D Spec Tree canvas (Phase 5)
- Tagline: "Spec-driven development for AI agents"
- Subtitle: "A git-native product structure with outcome hypotheses, drift detection, and deterministic context"
- Uses existing `Wordmark.tsx` with glow animation
- Staggered fade-in animations (existing CSS pattern)

#### `src/components/ProblemSection.tsx`

- Source: spec-tree.md "Value oblivion, best guesses and testing the wrong assertions"
- Three glassmorphism cards (reuse `DocCard.tsx` pattern or new cards):
  1. **Value drift** — specs capture only what to build, not why it exists. Dead code accumulates. Change requests look arbitrary.
  2. **Heuristic context** — agents grep for keywords, embedding similarity, tool defaults. Selection is hard to review and unstable.
  3. **Spec-test drift** — specs evolve, tests still pass for old behavior. No reviewable signal of what is currently believed to be true.
- Each card has a heading, description paragraph, and an icon or visual indicator

#### `src/components/SolutionSection.tsx`

- Source: spec-tree.md "The Spec Tree" and "What's actually new here"
- Three subsections showing what the Spec Tree combines:
  1. **Outcome hypothesis as organizing principle** — every node begins with a belief about what change it will produce
  2. **Drift detection via lock file** — Git blob hashes bind spec to test evidence, making drift visible before anyone runs a test
  3. **Deterministic context from tree structure** — the path from root to node defines what context an agent receives
- Include a `CodeExample.tsx` showing the Spec Tree directory structure from spec-tree.md
- Include a `CodeExample.tsx` showing a sample spec (status-rollup.md) and its lock file (spx-lock.yaml)

#### `src/components/GuidelinesSection.tsx`

- Source: spec-tree.md three guidelines
- Three items, each with:
  - Heading
  - Blockquote (the guideline statement)
  - Explanation paragraph
- Guidelines:
  1. **Always be converging** — "Iterate on a durable artifact in small, reviewable steps…"
  2. **Determinism unless creation is the goal** — "Never generate what can be derived deterministically."
  3. **Ask what matters** — "Expose the maximum leverage decisions, let the agent handle the rest."

#### `src/components/OperationalLoopSection.tsx`

- Source: spec-tree.md "The operational loop"
- Three `CodeExample.tsx` blocks showing terminal output for:
  1. `spx status --tree 54-spx-tree-interpretation.outcome`
  2. `spx lock 54-spx-tree-interpretation.outcome/43-status-rollup.outcome`
  3. `spx verify --tree 54-spx-tree-interpretation.outcome`
- Brief description of each command between the code blocks

#### `src/components/SpecTreeVisualization.tsx`

- Source: spec-tree.md full tree example (the large tree at lines 106–171)
- Static, stylized tree rendering (not `CodeExample` — custom component)
- Color-coded node states:
  - Green: valid nodes (solid border or text color)
  - Amber (`#f59e0b`): stale nodes
  - Muted gray: needs work nodes
- Tree connector lines (CSS borders or SVG)
- Node labels with type indicators (`.enabler` / `.outcome`)
- This serves as the permanent fallback for the 3D visualization (Phase 5)
- Should be responsive: horizontal scroll on mobile if needed

#### `src/components/CTASection.tsx`

- Call to action with links:
  - "Read the docs" → `https://docs.outcome.engineering`
  - "View on GitHub" → `https://github.com/outcomeengineering`
  - "Try spx" → `https://github.com/outcomeengineering/spx-cli`
- Uses existing `btn-primary` and `btn-secondary` styles

### Page composition

Update `src/app/page.tsx` to compose sections in order:

```tsx
<>
  <div className="grid-background" aria-hidden="true" />
  <div className="noise-overlay" aria-hidden="true" />
  <main className="min-h-screen flex flex-col">
    <HeroSection />
    <ProblemSection />
    <SolutionSection />
    <GuidelinesSection />
    <OperationalLoopSection />
    <SpecTreeVisualization />
    <CTASection />
    <Footer />
  </main>
</>;
```

### Design system extensions (`src/app/globals.css`)

Add CSS custom properties:

```css
--state-valid: #22c55e; /* green-500 */
--state-stale: #f59e0b; /* amber-500 (matches accent) */
--state-needs-work: #737373; /* neutral-500 */
```

Add classes:

```css
.tree-connector {
  /* vertical/horizontal connector lines for the static tree */
}
.node-enabler {
  /* styling for enabler node labels */
}
.node-outcome {
  /* styling for outcome node labels */
}
.terminal-output {
  /* styling for terminal-like output blocks */
}
```

### Verification

`pnpm dev` → landing page shows all 7 sections in order with correct content from spec-tree.md. No broken imports. Responsive on mobile.

---

## Phase 4: Blog Setup — TODO

Add blog functionality at `outcome.engineering/blog`. First post adapted from spec-tree.md.

### Dependencies to install

```bash
pnpm add next-mdx-remote gray-matter
pnpm add -D @types/mdx rehype-pretty-code shiki
```

**Why `next-mdx-remote`:** Lightweight, works with Next.js App Router server components, no build-time content directory conventions. Alternatives considered: Velite (too opinionated for a single blog), @next/mdx (less flexible for dynamic loading), Content Collections (not native to Next.js).

### Content directory

```
content/
└── blog/
    └── spec-tree.mdx
```

At the project root, not inside `src/`.

### `content/blog/spec-tree.mdx`

- Adapted from `/Users/shz/Code/spx/spx-claude/methodology/outcome-engineering/posts/01-spec-tree/spec-tree.md`
- Add MDX frontmatter:

```yaml
---
title: "Growing a Spec Tree for Deterministic Context"
date: "2025-06-15"
description: "How a git-native product structure addresses value drift, heuristic context, and spec-test drift in agentic development."
author: "Simon Heimlicher"
---
```

- Preserve the full narrative content from spec-tree.md
- Convert any raw HTML (like `<kbd>`) to MDX-compatible markup

### `src/lib/blog.ts`

Blog utility functions:

```typescript
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
}

export function getAllPosts(): PostMeta[] {/* ... */}
export function getPostBySlug(slug: string): { meta: PostMeta; content: string } {/* ... */}
```

### `src/app/blog/page.tsx`

Blog listing page:

- Title: "Blog — Outcome Engineering"
- Lists all posts as `DocCard` components (reuse existing)
- Sorted by date descending
- Static generation: reads from `content/blog/` at build time

### `src/app/blog/[slug]/page.tsx`

Individual blog post page:

- Dynamic route using `generateStaticParams()` for all slugs
- Uses `MDXRemote` from `next-mdx-remote/rsc` (RSC-compatible)
- Wraps content in `BlogPost.tsx` layout component
- Passes custom MDX components for consistent styling

### `src/components/BlogPost.tsx`

Blog post layout:

- Title (h1)
- Date + author line
- Content area with max-width prose styling
- Back link to `/blog`
- Uses existing design system colors and typography

### `src/components/mdx/index.tsx`

Custom MDX component overrides:

- `h1` through `h4`: styled headings matching site typography
- `pre` / `code`: delegate to `CodeExample.tsx` or styled code blocks
- `a`: styled links with amber underline (existing `.accent-underline` class)
- `blockquote`: styled with left border, muted text
- `table`: styled with borders matching design system
- `img`: responsive with rounded corners

### Navigation integration

- Add "Blog" link in the hero CTA area or a nav bar (if one is added later)
- The existing `DocCard` for "Blog" in `page.tsx` already links to `/blog`

### Verification

`pnpm dev` → `/blog` shows the listing with one post card. `/blog/spec-tree` renders the full post with correct styling. No hydration errors.

---

## Phase 5: Animations and 3D Spec Tree — TODO

Interactive 3D Spec Tree explorer with scroll-driven animation. This is the most complex phase and is broken into four sub-phases that each deliver independent value.

### Dependencies to install

```bash
pnpm add three @react-three/fiber @react-three/drei framer-motion
pnpm add -D @types/three
```

### Data model: `src/lib/spec-tree-data.ts`

TypeScript types and sample data for the visualization:

```typescript
type NodeState = "valid" | "stale" | "needs-work";
type NodeType = "product" | "enabler" | "outcome" | "decision";

interface SpecNode {
  id: string;
  slug: string;
  label: string; // display name
  type: NodeType;
  state: NodeState;
  index: number; // numeric prefix
  children: SpecNode[];
  depth: number;
  hasLockFile: boolean;
  hasTests: boolean;
  purpose?: string; // outcome hypothesis excerpt
}
```

Sample data: the `spx-cli` Spec Tree from spec-tree.md (lines 106–171), encoded as a `SpecNode` tree.

### Phase 5A: MVP 3D tree (static rendering)

Create basic 3D visualization that renders the Spec Tree as an interactive 3D model.

#### `src/components/three/SpecTreeCanvas.tsx`

- Main React Three Fiber `<Canvas>` component
- Scene setup: camera position, ambient + directional lighting
- `<OrbitControls>` from `@react-three/drei` for user rotation/zoom/pan
- Background: transparent (overlays on the dark grid background)
- Dynamic import with `next/dynamic` and `ssr: false` to avoid SSR issues with Three.js

#### `src/components/three/TreeNode.tsx`

- Individual node rendered as a 3D object
- Geometry: `<Sphere>` or `<RoundedBox>` from `@react-three/drei`
- Color-coded by state:
  - Valid: `--state-valid` (#22c55e)
  - Stale: `--state-stale` (#f59e0b)
  - Needs work: `--state-needs-work` (#737373)
- Size varies by type: product > enabler/outcome > decision
- Label text using `<Text>` from `@react-three/drei`

#### `src/components/three/TreeEdge.tsx`

- Connection line between parent and child nodes
- `<Line>` geometry from `@react-three/drei`
- Thin amber lines matching the design system accent color
- Opacity reduced for visual hierarchy

#### `src/components/three/TreeLayout.tsx`

- Layout algorithm: takes a `SpecNode` tree and assigns 3D positions
- Radial tree layout (root at center, children radiate outward) or layered top-down layout
- Spacing calculated from tree depth and sibling count
- Returns `Map<string, [x, y, z]>` mapping node IDs to positions

#### Integration

Replace `<SpecTreeVisualization />` in `page.tsx` with:

```tsx
const SpecTree3D = dynamic(() => import("@/components/three/SpecTreeCanvas"), {
  ssr: false,
  loading: () => <SpecTreeVisualization />, // static fallback while loading
});
```

#### Responsive behavior

- Desktop: full 3D with OrbitControls
- Mobile: smaller scale, touch-friendly controls
- No WebGL: falls back to `<SpecTreeVisualization />` (Phase 3 static tree)

### Phase 5B: Animated transitions

Add spring animations so the tree feels alive.

#### Node growth animation

- Nodes scale from 0 to full size with spring physics (`useSpring` from `@react-three/drei`)
- Stagger: deeper nodes appear after shallower ones (100ms delay per depth level)

#### Edge drawing animation

- Edges animate from parent to child (line grows along the path)
- Triggered after parent node finishes appearing

#### `src/components/three/ContextPath.tsx`

- When user clicks a node, the deterministic context injection path lights up:
  - Path from product root to clicked node glows amber
  - Lower-index siblings along the path pulse briefly
  - Higher-index siblings and excluded nodes dim
- Click again or click background to reset

### Phase 5C: Interactive features

Add hover/click interactions for exploring nodes.

#### `src/components/three/NodeDetail.tsx`

- HTML overlay panel using `<Html>` from `@react-three/drei`
- Appears when a node is clicked
- Shows:
  - Node name and type (enabler/outcome)
  - Current state (valid/stale/needs work)
  - Purpose excerpt (from `SpecNode.purpose`)
  - Assertion count
- Styled with glassmorphism to match the site design
- Dismissible by clicking elsewhere

#### `src/components/three/LockFileAnimation.tsx`

- Visual animation of a lock file "snapping" into place
- Triggered when demonstrating `spx lock`:
  - Lock icon appears above node
  - Descends and attaches with a subtle flash
  - Node color transitions from needs-work gray to valid green

#### `src/components/three/StateTransition.tsx`

- Node state change animations:
  - Valid → stale: node pulses amber, border flickers
  - Needs work → valid: node glows green, lock icon appears
  - Any state → regressed: node flashes red briefly

### Phase 5D: Scroll-driven narrative

The most ambitious feature: the Spec Tree builds itself as the user scrolls through the page.

#### `src/components/ScrollTree.tsx`

- Combines scroll position (via Framer Motion `useScroll`) with the 3D tree state
- The R3F canvas is `position: fixed` while content sections scroll over/under it

#### Keyframe sequence (tied to scroll percentage)

| Scroll % | What happens                                       | Content section visible  |
| -------- | -------------------------------------------------- | ------------------------ |
| 0–15%    | Empty canvas, grid background only                 | Hero                     |
| 15–25%   | Product node appears at center                     | Problem section          |
| 25–35%   | Decision records (ADR/PDR) fade in at index 15     | Problem section          |
| 35–50%   | Enabler nodes grow at indices 21, 32, 43           | Solution section         |
| 50–65%   | Outcome nodes appear at indices 54, 76, 87         | Guidelines section       |
| 65–75%   | Lock files snap onto valid nodes                   | Operational loop section |
| 75–85%   | Context injection path lights up for a target node | Operational loop section |
| 85–100%  | Full tree visible, interactive controls enabled    | CTA section              |

#### Implementation approach

1. Define keyframe data: `Array<{ scrollStart: number; scrollEnd: number; visibleNodes: string[]; highlights: string[] }>`
2. Use Framer Motion `useTransform` to interpolate between keyframes
3. Pass interpolated state to `SpecTreeCanvas` as props
4. Canvas smoothly transitions between states (nodes fade in/out, edges draw/retract)

### Performance considerations

| Concern                         | Mitigation                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| Three.js bundle size (500KB+)   | Dynamic import with `ssr: false`, code splitting                                     |
| Scroll jank with 3D rendering   | Throttle scroll events, use `requestAnimationFrame`, simplify geometry during scroll |
| Mobile WebGL performance        | Feature detection, static fallback for low-end devices, reduced node count           |
| Large canvas on retina displays | Set `dpr={[1, 2]}` on Canvas for adaptive pixel ratio                                |
| Initial load time               | Lazy load the 3D scene only when user scrolls to the visualization section           |

---

## Phase Dependencies

```
Phase 1 (Foundation) ✅ COMPLETED
  ├──> Phase 2 (Docs) ✅ COMPLETED
  └──> Phase 3 (Landing page content)
         ├──> Phase 4 (Blog)
         └──> Phase 5A (MVP 3D)
                └──> Phase 5B (Animated transitions)
                       └──> Phase 5C (Interactive features)
                              └──> Phase 5D (Scroll-driven narrative)
```

Phases 3 and 4 are independent of each other and can be done in parallel.
Phase 5 sub-phases are sequential — each builds on the previous.

## Verification checklist

| Phase    | Command                       | Expected result                                                                                                  |
| -------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Phase 1  | `pnpm build`                  | ✅ Builds with no errors. No Agent prompt content.                                                               |
| Phase 2  | `mintlify dev` in `mintlify/` | All 19 pages render. Guide + Reference tabs navigate correctly. No broken links. Correct terminology throughout. |
| Phase 3  | `pnpm dev`                    | Landing page shows 7 sections in order. Content matches spec-tree.md. Responsive on mobile.                      |
| Phase 4  | `pnpm dev`                    | `/blog` shows listing. `/blog/spec-tree` renders full post. No hydration errors.                                 |
| Phase 5A | `pnpm dev`                    | 3D tree renders in the visualization section. OrbitControls work. Fallback shown without WebGL.                  |
| Phase 5B | `pnpm dev`                    | Nodes animate in with spring physics. Edges draw on appear.                                                      |
| Phase 5C | `pnpm dev`                    | Click node shows detail overlay. Context path lights up. State transitions animate.                              |
| Phase 5D | `pnpm dev`                    | Tree builds as user scrolls. Keyframes trigger at correct scroll positions. Canvas stays fixed.                  |

## Key source files (read-only reference)

| File                                                                                                  | Role                                                                                               |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `/Users/shz/Code/spx/spx-claude/methodology/outcome-engineering/posts/01-spec-tree/spec-tree.md`      | **AUTHORITATIVE** — defines the current model, all landing page and docs content derived from this |
| `/Users/shz/Code/spx/spx-claude/methodology/testing/testing-foundation.md`                            | Testing concepts: three levels, 4-part progression, cost analysis                                  |
| `/Users/shz/Code/spx/spx-claude/methodology/skills/skill-structure.md`                                | Skill concepts: three layers, markers, conversational flow                                         |
| `/Users/shz/Code/spx/spx-claude/methodology/outcome-engineering/reference/outcome-engineering-plc.md` | Program Logic Chain: outputs vs outcomes distinction                                               |
