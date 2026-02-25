/** Spec tree directory listing for the hero overlay. */

interface TreeEntry {
  chrome: string;
  name: string;
  cls?: string;
  status?: string;
  statusCls?: string;
}

const entries: TreeEntry[] = [
  { chrome: "", name: "spx/", cls: "st-product" },
  { chrome: "\u251C\u2500\u2500 ", name: "spx-cli.product.md", cls: "st-product" },
  { chrome: "\u251C\u2500\u2500 ", name: "15-cli-framework.adr.md", cls: "st-decision" },
  {
    chrome: "\u251C\u2500\u2500 ",
    name: "21-test-harness.enabler/",
    cls: "st-enabler",
    status: "\u25CF valid",
    statusCls: "st-s-valid",
  },
  { chrome: "\u2502   \u251C\u2500\u2500 ", name: "test-harness.md" },
  { chrome: "\u2502   \u251C\u2500\u2500 ", name: "tests/" },
  { chrome: "\u2502   \u2514\u2500\u2500 ", name: "spx-lock.yaml" },
  {
    chrome: "\u251C\u2500\u2500 ",
    name: "32-parse-directory-tree.enabler/",
    cls: "st-enabler",
    status: "\u25CF valid",
    statusCls: "st-s-valid",
  },
  {
    chrome: "\u251C\u2500\u2500 ",
    name: "43-node-status.enabler/",
    cls: "st-enabler",
    status: "\u25CF valid",
    statusCls: "st-s-valid",
  },
  {
    chrome: "\u251C\u2500\u2500 ",
    name: "54-spx-tree-interpretation.outcome/",
    cls: "st-outcome",
    status: "\u25D0 stale",
    statusCls: "st-s-stale",
  },
  { chrome: "\u2502   \u251C\u2500\u2500 ", name: "spx-tree-interpretation.md" },
  {
    chrome: "\u2502   \u251C\u2500\u2500 ",
    name: "21-parent-child-links.enabler/",
    cls: "st-enabler",
    status: "\u25CF valid",
    statusCls: "st-s-valid",
  },
  {
    chrome: "\u2502   \u251C\u2500\u2500 ",
    name: "43-status-rollup.outcome/",
    cls: "st-outcome",
    status: "\u25D0 stale",
    statusCls: "st-s-stale",
  },
  {
    chrome: "\u2502   \u2514\u2500\u2500 ",
    name: "54-spx-tree-status.outcome/",
    cls: "st-outcome",
    status: "\u25CB needs work",
    statusCls: "st-s-needs",
  },
  {
    chrome: "\u251C\u2500\u2500 ",
    name: "76-cli-integration.outcome/",
    cls: "st-outcome",
    status: "\u25CF valid",
    statusCls: "st-s-valid",
  },
  {
    chrome: "\u2514\u2500\u2500 ",
    name: "87-e2e-workflow.outcome/",
    cls: "st-outcome",
    status: "\u25CB needs work",
    statusCls: "st-s-needs",
  },
];

export default function HeroSpecTree() {
  return (
    <div className="hero-spec-inner">
      <div className="text-xs tracking-[0.14em] uppercase text-[rgba(150,180,120,0.4)] font-medium mb-3">
        The Spec Tree
      </div>
      <div className="font-mono text-[0.82rem] leading-[1.7]">
        {entries.map((e, i) => (
          <div key={i} className="st-line">
            <span className="st-chrome">{e.chrome}</span>
            <span className={e.cls ?? "st-file"}>{e.name}</span>
            {e.status && <span className={`st-status ${e.statusCls}`}>{e.status}</span>}
          </div>
        ))}
      </div>
      <div className="flex gap-6 mt-4 pt-3 border-t border-white/[0.04]">
        <div className="flex items-center gap-[0.4em] text-xs text-[rgba(200,200,190,0.35)]">
          <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
          Valid
        </div>
        <div className="flex items-center gap-[0.4em] text-xs text-[rgba(200,200,190,0.35)]">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
          Stale
        </div>
        <div className="flex items-center gap-[0.4em] text-xs text-[rgba(200,200,190,0.35)]">
          <span className="w-2 h-2 rounded-full bg-[rgba(255,255,255,0.2)]" />
          Needs work
        </div>
      </div>
    </div>
  );
}
