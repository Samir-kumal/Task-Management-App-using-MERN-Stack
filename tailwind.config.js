/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#7994F2',
        'secondary': '#4b5563',
        'custom-color-1': '#ff9900',
        'custom-color-2': '#9900ff',
      },
      textColor: {
        'primary': '#7994F2',
        'secondary': '#4b5563',
        'custom-color-1': '#ff9900',
        'custom-color-2': '#9900ff',
      },
      borderColor: {
        'primary': '#7994F2',
        'secondary': '#4b5563',
        'custom-color-1': '#ff9900',
        'custom-color-2': '#9900ff',
      },
    },
  },
  plugins: [],
}

