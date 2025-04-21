import withMT from "@material-tailwind/react/utils/withMT";
import type { Config } from "tailwindcss";

const tailwindConfig: Config = withMT({
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [
  ],
}) as Config;

export default tailwindConfig satisfies Config;
