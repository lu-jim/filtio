/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/frontend/**/*.{js,ts,jsx,tsx}",
    "./app/views/**/*.html.erb"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      }
    }
  }
}
