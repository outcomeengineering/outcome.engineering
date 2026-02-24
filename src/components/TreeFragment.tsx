export interface TreeLine {
  chrome: string;
  name: string;
  nameClass?: string;
  status?: { label: string; stateClass: string };
  dim?: boolean;
}

interface TreeFragmentProps {
  lines: TreeLine[];
}

export default function TreeFragment({ lines }: TreeFragmentProps) {
  return (
    <div className="story-visual-inner">
      <div className="font-mono text-sm leading-[1.8]">
        {lines.map((line, i) => (
          <div
            key={i}
            className={`st-line${line.dim ? " opacity-20" : ""}`}
          >
            <span className="st-chrome">{line.chrome}</span>
            <span className={line.nameClass ?? "st-file"}>
              {line.name}
            </span>
            {line.status && (
              <span className={`st-status ${line.status.stateClass}`}>
                {line.status.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
