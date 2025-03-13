import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  // Files to exclude
  exclude: [],
  // Useful for theme customization
  theme: {
    extend: {},
    tokens: {
      colors: {
        blue: { value: '#1C51FC' },
        yellow: { value: '#FFD500' },
        gray: {
          100: { value: '#FAFAFA' },
          200: { value: '#EAEAEA' },
          300: { value: '#999999' },
          400: { value: '#888888' },
          500: { value: '#666666' },
          600: { value: '#444444' },
          700: { value: '#333333' },
          800: { value: '#111111' },
          900: { value: '#000000' },
        },
      },
    },
    semanticTokens: {
      colors: {
        success: {
          lighter: { value: '#D3E5FF' },
          light: { value: '#3291FF' },
          DEFAULT: { value: '#0070F3' },
          dark: { value: '#0761D1' },
        },
        warning: {
          lighter: { value: '#FFEFCF' },
          light: { value: '#F7B955' },
          DEFAULT: { value: '#F5A623' },
          dark: { value: '#AB570A' },
        },
        error: {
          lighter: { value: '#F7D4D6' },
          light: { value: '#FF1A1A' },
          DEFAULT: { value: '#EE0000' },
          dark: { value: '#C50000' },
        },
      },
    },
  },
  // The output directory for your css system
  outdir: 'styled-system',
})
