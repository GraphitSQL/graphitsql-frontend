import { BaseIconProps } from './icons.types';

const DatabaseOff = ({ color = '#D0D5DD' }: BaseIconProps) => (
  <svg
    width="468"
    height="468"
    viewBox="0 0 468 468"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_166_9250)">
      <path
        d="M92.313 92.4885C83.1285 99.9375 78 108.244 78 117C78 140.79 115.908 161.284 170.313 170.43M253.168 175.071C330.291 171.522 390 146.874 390 117C390 84.6885 320.151 58.5 234 58.5C201.61 58.5 171.522 62.205 146.582 68.5425L253.168 175.071Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M350.786 272.805C375.18 262.47 390 248.859 390 234V117M78 117V234C78 266.311 147.849 292.5 234 292.5C253.227 292.5 271.635 291.194 288.639 288.795L78 117Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M390 312V234M78 234V351C78 383.311 147.849 409.5 234 409.5C296.732 409.5 350.824 395.616 375.589 375.57L78 234Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58.5 58.5L409.5 409.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_166_9250">
        <rect width="468" height="468" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const Databases = {
  DatabaseOff,
};
