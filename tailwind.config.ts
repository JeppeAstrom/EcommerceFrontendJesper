import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      fontFamily:{
        montserrat: ["Montserrat", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"]
      }
    },
    screens: {
      zero: '0px',
      sm: '375px',
      md: '768px',
      lg: '1096px',
      xl: '1440px',
    },
    flex: {
      2: '2 2 0%',
      1: '1 1 0%',
      slides1: '0 0 100%',
      slides2: '0 0 calc(50% - 6px)',
      slides3: '0 0 calc(33.333333% - 8px)',
      slides4: '0 0 calc(25% - 9px)',
    },
    aspectRatio: {
      '2/1': '2 / 1',
      '1/2': '1 / 2',
      '3/1': '3 / 1',
      '9/13': '9 / 13',
      '13/9': '13 / 9',
      '9/16': '9 / 16',
    },
    
  },
  plugins: [],
};
export default config;
