import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/componentes/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};
export default config;
