export function ProjectDiagram({
  steps,
  title,
  compact = false,
}: {
  steps: string[];
  title: string;
  compact?: boolean;
}) {
  return (
    <div
      className={compact ? "system-diagram compact" : "system-diagram"}
      role="img"
      aria-label={title + ": " + steps.join(" to ")}
    >
      <div className="diagram-top">
        <span className="mono">SYSTEM / {title.toUpperCase()}</span>
        <span className="diagram-dot" aria-hidden="true" />
      </div>
      <div className="diagram-flow">
        {steps.map((step, i) => (
          <div className="diagram-step" key={step}>
            <span className="step-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
            {i < steps.length - 1 && (
              <span className="connector" aria-hidden="true">
                ↓
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="diagram-foot mono">
        Architecture overview <span aria-hidden="true">↗</span>
      </div>
    </div>
  );
}
