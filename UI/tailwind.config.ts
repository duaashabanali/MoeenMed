import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        'poppins':'var(--font-poppins)'
      },
      colors:{
        'purple':'#7F01C5',
        'alabaster':'#F8F7F8',
        'manatee':'#9095A0',
        'silver':'#C4C4C4'
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),],
};
export default config;
