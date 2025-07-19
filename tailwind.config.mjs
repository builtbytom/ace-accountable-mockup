/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Artist studio palette - actual paint colors
        umber: {
          50: '#faf8f6',
          100: '#f0e9e3',
          200: '#dcc9b8',
          300: '#c3a186',
          400: '#a87c5a',  // Raw umber
          500: '#8b6542',
          600: '#6e4f36',
          700: '#583f2d',
          800: '#463327',
          900: '#3a2b22',
        },
        cadmium: {
          50: '#fffdf0',
          100: '#fff9d1',
          200: '#fff394',
          300: '#ffe847',  // Cadmium yellow
          400: '#ffd700',
          500: '#f4c430',
          600: '#d19d00',
          700: '#a67700',
          800: '#895f00',
          900: '#744e00',
        },
        prussian: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',  // Prussian blue
          800: '#243b53',
          900: '#1a2f45',
        },
        sienna: {
          50: '#fef6f3',
          100: '#fce8df',
          200: '#f8c9b0',
          300: '#f3a679',
          400: '#ee8245',  // Burnt sienna
          500: '#e85d20',
          600: '#d04012',
          700: '#ac3010',
          800: '#8c2613',
          900: '#732113',
        },
        titanium: '#FAFAFA',  // Clean white
        charcoal: '#2B2424',  // Sketching charcoal
        // Paint splatter accent colors
        violet: '#8B7AB8',
        vermillion: '#E34234',
        ochre: '#CC7722',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.75rem', { lineHeight: '1.25rem' }],
        'xs': ['0.875rem', { lineHeight: '1.5rem' }],
        'sm': ['0.9375rem', { lineHeight: '1.625rem' }],
        'base': ['1rem', { lineHeight: '1.75rem' }],
        'lg': ['1.125rem', { lineHeight: '1.875rem' }],
        'xl': ['1.25rem', { lineHeight: '2rem' }],
        '2xl': ['1.5rem', { lineHeight: '2.25rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.5rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.75rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '4.25rem' }],
        '7xl': ['4.5rem', { lineHeight: '5rem' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.02\"/%3E%3C/svg%3E')",
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(255, 107, 107, 0.3)',
      },
    },
  },
  plugins: [],
}