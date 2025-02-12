const breakpoints = {
  xs: '320px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  xxl: '1536px'
};

const mediaQueries = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  xxl: `@media (min-width: ${breakpoints.xxl})`
};

export const theme = {
  colors: {
    primary: '#ff6b95',
    secondary: '#ffd3e0',
    text: '#f1f1f1',
    text1: '#ff6b95',
    text2: '#de7070',
    white: '#ffffff',
    lightPink: '#fff0f3',
    darkPink: '#ff4778',
    background: '#ffffff'
  },
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px'
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    heading: {
      mobile: {
        h1: '1.75rem',
        h2: '1.5rem',
        h3: '1.25rem'
      },
      tablet: {
        h1: '2.25rem',
        h2: '1.75rem',
        h3: '1.5rem'
      },
      desktop: {
        h1: '2.75rem',
        h2: '2.25rem',
        h3: '1.75rem'
      }
    },
    text: {
      small: '0.875rem',
      base: '1rem',
      large: '1.125rem'
    },
    lineHeight: {
      tight: 1.2,
      base: 1.5,
      relaxed: 1.75
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  borderRadius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 2px 4px rgba(0,0,0,0.1)',
    lg: '0 4px 6px rgba(0,0,0,0.1)',
    xl: '0 8px 12px rgba(0,0,0,0.1)'
  },
  transitions: {
    fast: 'all 0.2s ease',
    default: 'all 0.3s ease',
    slow: 'all 0.5s ease'
  },
  layout: {
    maxWidth: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    containerPadding: {
      mobile: '16px',
      tablet: '24px',
      desktop: '32px'
    }
  },
  breakpoints,
  mediaQueries
};
