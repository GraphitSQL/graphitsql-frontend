import { BaseIconProps } from './icons.types';

export const Dot = ({ color = '#D0D5DD' }: BaseIconProps) => (
  <svg
    width="7"
    height="7"
    viewBox="0 0 7 7"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <circle cx="3.5" cy="3.5" r="3.5" fill={color} />
  </svg>
);
