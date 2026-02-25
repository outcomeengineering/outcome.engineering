import type { ReactNode } from "react";

export interface StoryStepData {
  id: string;
  heading: string;
  quote?: string;
  body: string[];
  visual: ReactNode;
}

export default function StoryStep({ step }: { step: StoryStepData }) {
  return (
    <div className="story-step">
      <div className="story-visual">
        {step.visual}
      </div>
      <div className="story-text">
        <h3 className="font-display text-xl font-semibold tracking-tight mb-3">
          {step.heading}
        </h3>
        {step.quote && (
          <blockquote className="guideline-quote mb-3">
            {step.quote}
          </blockquote>
        )}
        {step.body.map((paragraph, i) => (
          <p key={i} className="text-[var(--text-muted)] leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
