import * as React from "react";
import { SVGProps } from "react";
const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={33}
    height={38}
    viewBox="0 0 33 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.39258 23.7183V15.3753C2.39258 15.3753 2.39258 13.7068 4.33927 13.7068C6.3807 13.7068 6.28597 15.3753 6.28597 15.3753V29.8365C6.28597 29.8365 6.28597 31.6502 8.51076 31.5051C10.1794 31.3963 10.4575 29.8365 10.4575 29.8365V4.52948C10.4575 4.52948 10.4575 2.30469 12.4041 2.30469C14.3508 2.30469 14.3508 4.52948 14.3508 4.52948V34.2861C14.3508 34.2861 14.3508 35.9547 16.2975 35.9547C18.5223 35.9547 18.5223 34.2861 18.5223 34.2861V11.2039C18.5223 11.2039 18.3289 8.97907 20.469 8.97907C22.6092 8.97907 22.4157 11.2039 22.4157 11.2039V30.3927C22.4157 30.3927 22.4157 32.0613 24.6405 32.0613C26.5872 32.0613 26.5872 30.3927 26.5872 30.3927V18.9906C26.5872 18.9906 26.5872 17.322 28.5339 17.322C30.4806 17.322 30.4806 18.9906 30.4806 18.9906V23.7183"
      stroke="url(#paint0_linear_1291_9794)"
      strokeWidth={3.14582}
    />
    <defs>
      <linearGradient
        id="paint0_linear_1291_9794"
        x1={32.7054}
        y1={20.3811}
        x2={0.723984}
        y2={20.3811}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFD12E" />
        <stop offset={0.25} stopColor="#F39D41" />
        <stop offset={0.5} stopColor="#BA525B" />
        <stop offset={0.75} stopColor="#5C4B78" />
        <stop offset={1} stopColor="#10083B" />
      </linearGradient>
    </defs>
  </svg>
);
export default Logo;
