/* eslint-disable */
/// <reference types="vite/client" />

declare module 'theme-change' {
  export function themeChange(params: boolean): void;
}

declare module '@/libs/buttonize' {
  export default function buttonize(callback: () => void): {
    role: 'button';
    onClick: () => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
  };
}
