import { ReactNode } from "react";

const colors = [
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
export default function Pill({
  title,
  icon,
}: {
  title: string;
  icon?: ReactNode;
}) {
  return (
    <div 
    style={{background: colors[Math.floor(Math.random() * colors.length)]}}
    className=" flex items-center justify-center gap-1 text-sm bg-[#fee] px-2 rounded-xl py-1 border border-brand-secondary/10 mx-1">
      {icon}
      <p className="md:text-sm text-xs text-neutral-700 truncate">{title}</p>
    </div>
  );
}
