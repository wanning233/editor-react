import type { SVGProps } from "react";

export function IndentDecrease(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="7,8 3,12 7,16" />
      <line x1="21" y1="4" x2="11" y2="4" />
      <line x1="21" y1="8" x2="11" y2="8" />
      <line x1="21" y1="12" x2="11" y2="12" />
      <line x1="21" y1="16" x2="11" y2="16" />
      <line x1="21" y1="20" x2="3" y2="20" />
    </svg>
  );
}
