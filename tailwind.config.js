/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        gray: {
          500: '#6b7280',
          900: '#1a202c',
        },
      },
      screens: {
        sm: '768px',
      },
    },
  },
  variants: {},
  plugins: [],
}

