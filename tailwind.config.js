/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
      extend: {
          colors: {
              // Green Phosphor Theme (Default OS)
              "surface-variant": "#353534",
              "primary": "#eeffe4",
              "on-surface": "#e5e2e1",
              "tertiary": "#fff8f4",
              "outline-variant": "#3c4b36",
              "secondary-container": "#fdaf00",
              "on-error": "#690005",
              "secondary-fixed": "#ffddaf",
              "inverse-on-surface": "#313030",
              "inverse-primary": "#006e06",
              "primary-fixed": "#76ff65",
              "surface-container": "#201f1f",
              "outline": "#85967d",
              "background": "#131313",
              "error": "#ffb4ab",
              "secondary": "#ffd393",
              "surface": "#131313",
              "on-error-container": "#ffdad6",
              "on-background": "#e5e2e1",
              "on-surface-variant": "#baccb1",
              "surface-container-low": "#1c1b1b",
              "surface-dim": "#131313",
              "secondary-fixed-dim": "#ffba43",
              "surface-container-lowest": "#0e0e0e",
              "primary-container": "#33ff33",
              "surface-bright": "#3a3939",
              "on-tertiary-container": "#755d3b",
              "on-primary-fixed": "#002201",
              "inverse-surface": "#e5e2e1",
              "primary-fixed-dim": "#00e61b",
              "on-tertiary": "#402d10",
              "on-secondary": "#432c00",
              "surface-container-highest": "#353534",
              "tertiary-fixed": "#feddb3",
              "on-primary-container": "#007207",
              "tertiary-container": "#f8d8ae",
              "surface-tint": "#00e61b",
              "surface-container-high": "#2a2a2a",
              "on-secondary-container": "#694600",
              "on-secondary-fixed": "#281800",
              "on-primary-fixed-variant": "#005303",
              "on-secondary-fixed-variant": "#614000",
              "on-tertiary-fixed": "#281801",
              "on-primary": "#003a02",
              "on-tertiary-fixed-variant": "#584324",
              "error-container": "#93000a",
              "tertiary-fixed-dim": "#e1c299",

              // Analog Cyan Theme (Hero / Boot)
              "cyan-primary": "#e2ede6",
              "cyan-primary-container": "#e2ede6",
              "cyan-primary-fixed": "#e2ede6",
              "cyan-background": "#050605",
              "cyan-surface": "#131313",
              "cyan-surface-container": "#201f1f",
          },
          borderRadius: {
              "DEFAULT": "0.125rem",
              "lg": "0.25rem",
              "xl": "0.5rem",
              "full": "0.75rem"
          },
          spacing: {
              "container-padding": "24px",
              "margin-desktop": "40px",
              "grid-unit": "8px",
              "gutter": "16px",
              "margin-mobile": "20px"
          },
          fontFamily: {
              "body-lg": ["JetBrains Mono", "monospace"],
              "body-md": ["JetBrains Mono", "monospace"],
              "headline-md": ["Space Grotesk", "sans-serif"],
              "terminal-code": ["JetBrains Mono", "monospace"],
              "headline-sm": ["JetBrains Mono", "monospace"],
              "label-md": ["Space Mono", "monospace"],
              "headline-lg": ["Space Grotesk", "sans-serif"]
          },
          fontSize: {
              "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
              "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
              "headline-md": ["32px", { lineHeight: "1.2", fontWeight: "700" }],
              "terminal-code": ["14px", { lineHeight: "1.4", fontWeight: "400" }],
              "headline-sm": ["24px", { lineHeight: "1.4", fontWeight: "600" }],
              "label-md": ["14px", { lineHeight: "1.2", letterSpacing: "0.1em", fontWeight: "400" }],
              "headline-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.05em", fontWeight: "700" }]
          }
      }
  },
  plugins: [],
}
