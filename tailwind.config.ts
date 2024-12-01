import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7f56d9',
        border: '#d1d5de',
        'border-primary': '#d6bbfb',
        'text-primary': '#101828',
        'text-secondary': '#475467',
        'text-button': '#344054',
        'text-input': '#667085',
        'main-bg': '#f5f5f5',
        'card-bg': '#f9fafb'
      }
    }
  },
  plugins: []
} satisfies Config;
