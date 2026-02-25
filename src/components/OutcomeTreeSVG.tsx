/**
 * Procedural outcome tree SVG — ported from hero-proposals.html buildOutcomeTree().
 * Generates a tree illustration with canopy (leaves = outcomes) above a ground line
 * and roots (goals/understanding) below it. Deterministic via seeded PRNG.
 */

const { sin, cos, sqrt, PI, floor, min, max } = Math;
const R = (a: number) => (a * PI) / 180;
const f = (n: number) => n.toFixed(1);

function mkRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const BARK = ["#2a1e14", "#241a10", "#1e1508", "#30241a", "#281c12"];
const ROOT_C = ["#7a6538", "#6a5530", "#8a7540", "#5a4828", "#9a8548"];
const LEAF_C = [
  "#3d9630",
  "#4a9e3a",
  "#5aae4a",
  "#6abf5a",
  "#3a8e2a",
  "#55b845",
  "#48a535",
  "#42a030",
];

type RngFn = () => number;

function drawBranch(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  w: number,
  rng: RngFn,
  colors: string[],
  ci: number,
): string {
  const dx = x1 - x0, dy = y1 - y0, len = sqrt(dx * dx + dy * dy);
  if (len < 0.3) return "";
  const nx = -dy / len, ny = dx / len;
  const wb1 = len * 0.16 * (rng() - 0.5), wb2 = len * 0.13 * (rng() - 0.5);
  return `<path d="M${f(x0)} ${f(y0)} C${f(x0 + dx * 0.3 + nx * wb1)} ${f(y0 + dy * 0.3 + ny * wb1)}, ${
    f(x0 + dx * 0.7 + nx * wb2)
  } ${f(y0 + dy * 0.7 + ny * wb2)}, ${f(x1)} ${f(y1)}" stroke="${colors[ci % colors.length]}" stroke-width="${
    f(w)
  }" stroke-linecap="round" fill="none"/>`;
}

function drawLeaf(cx: number, cy: number, angle: number, size: number, rng: RngFn): string {
  const l = size, hw = size * 0.38, c = LEAF_C[floor(rng() * LEAF_C.length)];
  const op = 0.75 + rng() * 0.25;
  return `<g transform="translate(${f(cx)},${f(cy)}) rotate(${f(angle)})">
    <path d="M0 0 C${f(-hw)} ${f(-l * 0.35)}, ${f(-hw * 0.5)} ${f(-l * 0.9)}, ${f(hw * 0.25)} ${f(-l)}
      C${f(hw * 1.15)} ${f(-l * 0.9)}, ${f(hw * 1.4)} ${f(-l * 0.35)}, ${f(hw * 0.65)} 0Z"
      fill="${c}" stroke="#1a2a10" stroke-width="0.35" opacity="${f(op)}"/>
    <path d="M${f(hw * 0.32)} -0.5 L${f(hw * 0.32)} ${
    f(-l * 0.82)
  }" stroke="#2d7520" stroke-width="0.25" fill="none" opacity="0.6"/>
  </g>`;
}

function leafCluster(
  x: number,
  y: number,
  brAngle: number,
  count: number,
  leafSz: number,
  rng: RngFn,
): string {
  let s = "";
  const baseA = brAngle - 90;
  const spread = min(55, 160 / max(count, 1));
  for (let i = 0; i < count; i++) {
    const a = baseA + (i - (count - 1) / 2) * spread + (rng() - 0.5) * 18;
    const sz = leafSz * (0.75 + rng() * 0.4);
    const stemLen = 2.5 + rng() * 2.5;
    const stemA = R(a);
    const stemEndX = x + cos(stemA) * stemLen;
    const stemEndY = y + sin(stemA) * stemLen;
    const smx = x + cos(stemA) * stemLen * 0.5 + (rng() - 0.5);
    const smy = y + sin(stemA) * stemLen * 0.5 + (rng() - 0.5);
    s += `<path d="M${f(x)} ${f(y)} Q${f(smx)} ${f(smy)}, ${f(stemEndX)} ${
      f(stemEndY)
    }" stroke="#3a6828" stroke-width="${f(0.4 + rng() * 0.3)}" stroke-linecap="round" fill="none" opacity="0.7"/>`;
    const ox = rng() - 0.5;
    const oy = rng() - 0.5;
    s += drawLeaf(stemEndX + ox, stemEndY + oy, a, sz, rng);
  }
  return s;
}

function drawRootMass(
  cx: number,
  cy: number,
  angle: number,
  count: number,
  size: number,
  rng: RngFn,
): string {
  let s = "";
  for (let i = 0; i < count; i++) {
    const a = R(angle + (i - (count - 1) / 2) * (40 / max(count, 1)) + (rng() - 0.5) * 25);
    const l = size * (0.5 + rng() * 0.6);
    const ex = cx + cos(a) * l, ey = cy + sin(a) * l;
    const mx = cx + (ex - cx) * 0.5 + (rng() - 0.5) * 3;
    const my = cy + (ey - cy) * 0.5 + (rng() - 0.5) * 3;
    const c = ROOT_C[floor(rng() * ROOT_C.length)];
    const w = 0.4 + rng() * 0.6;
    const op = 0.45 + rng() * 0.4;
    s += `<path d="M${f(cx)} ${f(cy)} Q${f(mx)} ${f(my)}, ${f(ex)} ${f(ey)}" stroke="${c}" stroke-width="${
      f(w)
    }" stroke-linecap="round" fill="none" opacity="${f(op)}"/>`;
    if (rng() > 0.3) {
      const fl = l * 0.25;
      const fa = a + (rng() - 0.5) * 0.8;
      s += `<path d="M${f(ex)} ${f(ey)} L${f(ex + cos(fa + 0.3) * fl)} ${
        f(ey + sin(fa + 0.3) * fl)
      }" stroke="${c}" stroke-width="${f(w * 0.5)}" stroke-linecap="round" fill="none" opacity="${f(op * 0.7)}"/>`;
      s += `<path d="M${f(ex)} ${f(ey)} L${f(ex + cos(fa - 0.3) * fl)} ${
        f(ey + sin(fa - 0.3) * fl)
      }" stroke="${c}" stroke-width="${f(w * 0.4)}" stroke-linecap="round" fill="none" opacity="${f(op * 0.6)}"/>`;
    }
  }
  return s;
}

type BranchTip = { a: number; l: number; leaves: number };
type SubBranch = { a: number; l: number; L2leaves: number; tips: BranchTip[] };
type PrimaryBranch = { a: number; l: number; wr: number; L1leaves: number; subs: SubBranch[] };

type RootTip = { a: number; l: number; mass: number };
type SubRoot = { a: number; l: number; L2mass: number; tips: RootTip[] };
type PrimaryRoot = { a: number; l: number; wr: number; L1mass: number; subs: SubRoot[] };

function buildOutcomeTree(): string {
  const rng = mkRng(2026);
  let svg = "";

  const GY = 140, TX = 100;
  const trunkW = 9;

  // Ground line
  svg +=
    `<line x1="5" y1="${GY}" x2="195" y2="${GY}" stroke="rgba(140,110,55,0.15)" stroke-width="0.5" stroke-dasharray="2,2"/>`;

  // Trunk
  const ttx = TX - 1, tty = GY - 32;
  svg += `<path d="M${TX} ${GY} C${f(TX + (rng() - 0.5) * 1.5)} ${f(GY - 10)}, ${f(TX - 1 + (rng() - 0.5) * 1.5)} ${
    f(GY - 22)
  }, ${f(ttx)} ${f(tty)}" stroke="${BARK[0]}" stroke-width="${trunkW}" stroke-linecap="round" fill="none"/>`;

  // Canopy: 7 primary branches with 3 fork levels
  const canopy: PrimaryBranch[] = [
    {
      a: -164,
      l: 34,
      wr: 0.30,
      L1leaves: 3,
      subs: [
        { a: -176, l: 18, L2leaves: 3, tips: [{ a: -184, l: 12, leaves: 2 }, { a: -170, l: 13, leaves: 2 }] },
        { a: -158, l: 20, L2leaves: 2, tips: [{ a: -166, l: 13, leaves: 2 }, { a: -150, l: 12, leaves: 2 }] },
        { a: -146, l: 16, L2leaves: 3, tips: [{ a: -155, l: 11, leaves: 2 }, { a: -138, l: 12, leaves: 2 }] },
      ],
    },
    {
      a: -142,
      l: 38,
      wr: 0.28,
      L1leaves: 3,
      subs: [
        { a: -158, l: 18, L2leaves: 3, tips: [{ a: -168, l: 12, leaves: 2 }, { a: -150, l: 13, leaves: 2 }] },
        { a: -138, l: 20, L2leaves: 2, tips: [{ a: -148, l: 13, leaves: 2 }, { a: -130, l: 12, leaves: 2 }] },
        { a: -124, l: 17, L2leaves: 3, tips: [{ a: -134, l: 12, leaves: 2 }, { a: -116, l: 11, leaves: 2 }] },
      ],
    },
    {
      a: -118,
      l: 36,
      wr: 0.26,
      L1leaves: 3,
      subs: [
        { a: -134, l: 17, L2leaves: 2, tips: [{ a: -144, l: 12, leaves: 2 }, { a: -126, l: 11, leaves: 2 }] },
        { a: -118, l: 19, L2leaves: 3, tips: [{ a: -128, l: 12, leaves: 2 }, { a: -110, l: 13, leaves: 2 }] },
        { a: -104, l: 16, L2leaves: 2, tips: [{ a: -114, l: 11, leaves: 2 }, { a: -96, l: 12, leaves: 2 }] },
        { a: -92, l: 14, L2leaves: 2, tips: [{ a: -100, l: 11, leaves: 2 }] },
      ],
    },
    {
      a: -88,
      l: 40,
      wr: 0.32,
      L1leaves: 4,
      subs: [
        { a: -106, l: 17, L2leaves: 3, tips: [{ a: -116, l: 12, leaves: 2 }, { a: -98, l: 13, leaves: 2 }] },
        { a: -90, l: 19, L2leaves: 3, tips: [{ a: -100, l: 13, leaves: 2 }, { a: -82, l: 12, leaves: 2 }] },
        { a: -76, l: 18, L2leaves: 2, tips: [{ a: -86, l: 12, leaves: 2 }, { a: -68, l: 13, leaves: 2 }] },
        { a: -62, l: 15, L2leaves: 3, tips: [{ a: -72, l: 11, leaves: 2 }, { a: -54, l: 12, leaves: 2 }] },
      ],
    },
    {
      a: -58,
      l: 36,
      wr: 0.25,
      L1leaves: 3,
      subs: [
        { a: -72, l: 17, L2leaves: 2, tips: [{ a: -82, l: 12, leaves: 2 }, { a: -64, l: 11, leaves: 2 }] },
        { a: -56, l: 19, L2leaves: 3, tips: [{ a: -66, l: 12, leaves: 2 }, { a: -48, l: 13, leaves: 2 }] },
        { a: -42, l: 16, L2leaves: 2, tips: [{ a: -52, l: 11, leaves: 2 }, { a: -34, l: 12, leaves: 2 }] },
      ],
    },
    {
      a: -36,
      l: 34,
      wr: 0.24,
      L1leaves: 3,
      subs: [
        { a: -50, l: 16, L2leaves: 2, tips: [{ a: -58, l: 11, leaves: 2 }, { a: -42, l: 12, leaves: 2 }] },
        { a: -36, l: 18, L2leaves: 3, tips: [{ a: -46, l: 12, leaves: 2 }, { a: -28, l: 11, leaves: 2 }] },
        { a: -22, l: 15, L2leaves: 2, tips: [{ a: -32, l: 11, leaves: 2 }, { a: -14, l: 12, leaves: 2 }] },
      ],
    },
    {
      a: -14,
      l: 30,
      wr: 0.20,
      L1leaves: 2,
      subs: [
        { a: -26, l: 16, L2leaves: 2, tips: [{ a: -34, l: 11, leaves: 2 }, { a: -18, l: 12, leaves: 2 }] },
        { a: -10, l: 18, L2leaves: 3, tips: [{ a: -20, l: 12, leaves: 2 }, { a: -2, l: 11, leaves: 2 }] },
        { a: 4, l: 14, L2leaves: 2, tips: [{ a: -6, l: 11, leaves: 2 }, { a: 12, l: 12, leaves: 2 }] },
      ],
    },
  ];

  canopy.forEach((br, bi) => {
    const w = trunkW * br.wr;
    const ba = R(br.a), bex = ttx + cos(ba) * br.l, bey = tty + sin(ba) * br.l;
    svg += drawBranch(ttx, tty, bex, bey, w, rng, BARK, bi);
    svg += leafCluster(bex, bey, br.a, br.L1leaves, 6.5 + rng(), rng);

    br.subs.forEach((sub, si) => {
      const sw = w * (0.42 + rng() * 0.12);
      const sa = R(sub.a), sex = bex + cos(sa) * sub.l, sey = bey + sin(sa) * sub.l;
      svg += drawBranch(bex, bey, sex, sey, sw, rng, BARK, bi + si);
      svg += leafCluster(sex, sey, sub.a, sub.L2leaves, 7 + rng() * 1.5, rng);

      sub.tips.forEach((tip, ti) => {
        const tw = sw * (0.38 + rng() * 0.12);
        const ta = R(tip.a), tex = sex + cos(ta) * tip.l, tey = sey + sin(ta) * tip.l;
        svg += drawBranch(sex, sey, tex, tey, tw, rng, BARK, bi + si + ti);
        svg += leafCluster(tex, tey, tip.a, tip.leaves, 7.5 + rng() * 2, rng);
      });
    });
  });

  // Roots: 7 primary roots, 3 fork levels
  const rootSystem: PrimaryRoot[] = [
    {
      a: 166,
      l: 24,
      wr: 0.24,
      L1mass: 4,
      subs: [
        { a: 178, l: 14, L2mass: 5, tips: [{ a: 185, l: 10, mass: 4 }, { a: 172, l: 9, mass: 3 }] },
        { a: 162, l: 16, L2mass: 4, tips: [{ a: 170, l: 10, mass: 4 }, { a: 155, l: 9, mass: 3 }] },
        { a: 148, l: 13, L2mass: 5, tips: [{ a: 156, l: 9, mass: 3 }, { a: 140, l: 10, mass: 4 }] },
      ],
    },
    {
      a: 144,
      l: 28,
      wr: 0.22,
      L1mass: 5,
      subs: [
        { a: 160, l: 14, L2mass: 4, tips: [{ a: 168, l: 9, mass: 4 }, { a: 152, l: 10, mass: 3 }] },
        { a: 146, l: 16, L2mass: 5, tips: [{ a: 154, l: 10, mass: 4 }, { a: 138, l: 9, mass: 3 }] },
        { a: 132, l: 13, L2mass: 4, tips: [{ a: 140, l: 9, mass: 3 }, { a: 124, l: 10, mass: 4 }] },
      ],
    },
    {
      a: 118,
      l: 26,
      wr: 0.20,
      L1mass: 4,
      subs: [
        { a: 134, l: 13, L2mass: 4, tips: [{ a: 142, l: 9, mass: 3 }, { a: 126, l: 10, mass: 4 }] },
        { a: 118, l: 15, L2mass: 5, tips: [{ a: 126, l: 10, mass: 4 }, { a: 110, l: 9, mass: 3 }] },
        { a: 104, l: 12, L2mass: 4, tips: [{ a: 112, l: 9, mass: 3 }, { a: 96, l: 10, mass: 4 }] },
        { a: 92, l: 10, L2mass: 3, tips: [{ a: 98, l: 8, mass: 3 }] },
      ],
    },
    {
      a: 90,
      l: 30,
      wr: 0.26,
      L1mass: 5,
      subs: [
        { a: 108, l: 14, L2mass: 5, tips: [{ a: 116, l: 10, mass: 4 }, { a: 100, l: 9, mass: 3 }] },
        { a: 92, l: 16, L2mass: 4, tips: [{ a: 100, l: 10, mass: 4 }, { a: 84, l: 9, mass: 3 }] },
        { a: 76, l: 15, L2mass: 5, tips: [{ a: 84, l: 10, mass: 4 }, { a: 68, l: 9, mass: 3 }] },
        { a: 62, l: 12, L2mass: 4, tips: [{ a: 70, l: 9, mass: 3 }, { a: 54, l: 10, mass: 4 }] },
      ],
    },
    {
      a: 60,
      l: 24,
      wr: 0.19,
      L1mass: 4,
      subs: [
        { a: 74, l: 14, L2mass: 4, tips: [{ a: 82, l: 9, mass: 3 }, { a: 66, l: 10, mass: 4 }] },
        { a: 58, l: 15, L2mass: 5, tips: [{ a: 66, l: 10, mass: 4 }, { a: 50, l: 9, mass: 3 }] },
        { a: 44, l: 12, L2mass: 4, tips: [{ a: 52, l: 9, mass: 3 }, { a: 36, l: 10, mass: 4 }] },
      ],
    },
    {
      a: 38,
      l: 26,
      wr: 0.21,
      L1mass: 4,
      subs: [
        { a: 52, l: 13, L2mass: 4, tips: [{ a: 60, l: 9, mass: 3 }, { a: 44, l: 10, mass: 4 }] },
        { a: 38, l: 15, L2mass: 5, tips: [{ a: 46, l: 10, mass: 4 }, { a: 30, l: 9, mass: 3 }] },
        { a: 24, l: 12, L2mass: 4, tips: [{ a: 32, l: 9, mass: 3 }, { a: 16, l: 10, mass: 4 }] },
      ],
    },
    {
      a: 14,
      l: 22,
      wr: 0.18,
      L1mass: 3,
      subs: [
        { a: 26, l: 13, L2mass: 4, tips: [{ a: 34, l: 9, mass: 3 }, { a: 18, l: 10, mass: 4 }] },
        { a: 12, l: 15, L2mass: 5, tips: [{ a: 20, l: 10, mass: 4 }, { a: 4, l: 9, mass: 3 }] },
        { a: -2, l: 11, L2mass: 3, tips: [{ a: 6, l: 9, mass: 3 }, { a: -8, l: 10, mass: 4 }] },
      ],
    },
  ];

  rootSystem.forEach((rt, ri) => {
    const w = trunkW * rt.wr * 0.6;
    const ra = R(rt.a), rex = TX + cos(ra) * rt.l, rey = GY + sin(ra) * rt.l;
    svg += drawBranch(TX, GY, rex, rey, w, rng, ROOT_C, ri);
    svg += drawRootMass(rex, rey, rt.a, rt.L1mass, 5 + rng() * 2, rng);

    rt.subs.forEach((sub, si) => {
      const sw = w * (0.5 + rng() * 0.15);
      const sa = R(sub.a), sex = rex + cos(sa) * sub.l, sey = rey + sin(sa) * sub.l;
      svg += drawBranch(rex, rey, sex, sey, sw, rng, ROOT_C, ri + si);
      svg += drawRootMass(sex, sey, sub.a, sub.L2mass, 6 + rng() * 2, rng);

      sub.tips.forEach((tip, ti) => {
        const tw = sw * (0.45 + rng() * 0.15);
        const ta = R(tip.a), tex = sex + cos(ta) * tip.l, tey = sey + sin(ta) * tip.l;
        svg += drawBranch(sex, sey, tex, tey, tw, rng, ROOT_C, ri + si + ti);
        svg += drawRootMass(tex, tey, tip.a, tip.mass, 7 + rng() * 3, rng);
      });
    });
  });

  return svg;
}

// Pre-compute at module level (deterministic, no side effects)
const treeSvgContent = buildOutcomeTree();

interface OutcomeTreeSVGProps {
  className?: string;
  variant?: "split" | "full";
}

export default function OutcomeTreeSVG({ className, variant = "split" }: OutcomeTreeSVGProps) {
  if (variant === "full") {
    return (
      <svg
        viewBox="-5 -5 210 295"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: "block", maxHeight: "85%", width: "auto" }}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Outcome tree — canopy of validated outcomes above, roots of goals and understanding below"
        dangerouslySetInnerHTML={{ __html: treeSvgContent }}
      />
    );
  }

  return (
    <div className={className}>
      {/* Canopy (above ground line) */}
      <svg
        viewBox="-5 -5 210 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="xMidYMax meet"
        role="img"
        aria-label="Outcome tree canopy — leaves represent validated outcomes"
        dangerouslySetInnerHTML={{ __html: treeSvgContent }}
      />
      {/* Ground line label */}
      <div className="relative h-[2px] bg-gradient-to-r from-transparent via-amber-800/30 to-transparent">
        <span className="absolute left-1/2 -translate-x-1/2 -translate-y-full text-xs tracking-widest uppercase text-amber-700/50 whitespace-nowrap pb-1">
          Outcome Hypothesis
        </span>
      </div>
      {/* Roots (below ground line) */}
      <svg
        viewBox="-5 138 210 152"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        preserveAspectRatio="xMidYMin meet"
        role="img"
        aria-label="Tree roots — representing goals and understanding"
        dangerouslySetInnerHTML={{ __html: treeSvgContent }}
      />
    </div>
  );
}
