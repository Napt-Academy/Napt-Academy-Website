import type { ComponentType } from "react";
import * as Lucide from "lucide-react";
import type { LucideProps } from "lucide-react";

type IconProps = LucideProps & { name: string };

export function Icon({ name, ...props }: IconProps) {
  const registry = Lucide as unknown as Record<string, ComponentType<LucideProps>>;
  const Cmp = registry[name] ?? Lucide.Shield;
  return <Cmp aria-hidden {...props} />;
}
