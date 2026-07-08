import { ReactNode } from "react";

const lightColors = [
  "#FFEEEE", // Red
  "#EEEEFF", // Blue
  "#EEFFEE", // Green
  "#FFFFEE", // Yellow
  "#FFF3E0", // Orange
  "#F3EEFF", // Purple
  "#EEFFFF", // Teal
  "#FFEFF3", // Rose
  "#F7FFEE", // Lime
  "#EFEFFF"  // Indigo
]

const darkColors = [
  "#2A1A1A", // Red
  "#1A1A2A", // Blue
  "#1A2A1A", // Green
  "#2A2A1A", // Yellow
  "#2A2218", // Orange
  "#221A2A", // Purple
  "#1A2A2A", // Teal
  "#2A1A22", // Rose
  "#222A1A", // Lime
  "#1E1E2A"  // Indigo
]

export default function Pill({
  title,
  icon,
}: {
  title: string;
  icon?: ReactNode;
}) {
  const lightBg = lightColors[Math.floor(Math.random() * lightColors.length)];
  const darkBg = darkColors[Math.floor(Math.random() * darkColors.length)];
  
  return (
    <div 
    style={{"--pill-light": lightBg, "--pill-dark": darkBg} as React.CSSProperties}
    className=" flex items-center justify-center gap-1 text-sm bg-[var(--pill-light)] dark:bg-[var(--pill-dark)] px-2 rounded-xl py-1 border border-brand-secondary/10 mx-1">
      {icon}
      <p className="md:text-sm text-xs text-muted-foreground truncate">{title}</p>
    </div>
  );
}
