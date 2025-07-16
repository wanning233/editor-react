import type { SVGProps } from "react";

export function Color(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6.3-.11.49-.4.49-.72 0-.83-.67-1.5-1.5-1.5-.17 0-.33.03-.5.08-.83.3-1.73.24-2.4-.42-.67-.67-.72-1.57-.42-2.4.05-.17.08-.33.08-.5 0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z" />
      <circle cx="6.5" cy="11.5" r="1.5" />
      <circle cx="9.5" cy="8.5" r="1.5" />
      <circle cx="14.5" cy="8.5" r="1.5" />
      <circle cx="17.5" cy="11.5" r="1.5" />
    </svg>
  );
}
