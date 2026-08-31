import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
  className,
  inverted = false,
}: {
  eyebrow?: string;
  title: string | string[];
  body?: string;
  align?: "center" | "left";
  className?: string;
  inverted?: boolean;
}) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow mb-3", inverted ? "text-gold" : "text-primary")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "text-3xl leading-tight font-semibold sm:text-4xl lg:text-[2.75rem]",
          inverted ? "text-cream" : "text-foreground",
        )}
      >
        {lines.map((line, i) => (
          <span key={line + i} className="block">
            {line}
          </span>
        ))}
      </h2>
      {body ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed",
            inverted ? "text-cream/75" : "text-muted-foreground",
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}
