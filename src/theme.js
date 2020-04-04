export const theme = {
  colors: {
    text: '#000000',
    background: '#ffffff',
    primary: '#3333ee',
    secondary: '#111199',
    muted: '#f8f8f8',
    highlight: '#efeffe',
    lightgray: '#ddd',
    gray: '#777777',
    accent: '#660099',
    darken: 'rgba(0, 0, 0, .0625)',
    modes: {
      dark: {
        text: '#ffffff',
        background: '#060606',
        primary: '#33ccff',
        secondary: '#ee00ff',
        muted: '#191919',
        highlight: '#29112c',
        gray: '#999999',
        lightgray: '#666',
        accent: '#cc00ff',
        darken: 'rgba(255, 255, 255, .0625)'
      }
    }
  },
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'athelas, georgia, serif',
    monospace: 'menlo, consolas, monaco, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  fontWeights: {
    body: 400,
    heading: 800,
    bold: 700,
    display: 800
  },
  lineHeights: {
    body: 1.4,
    heading: 1.25
  },
  sizes: {
    sidebar: 256,
    container: 600
  },
  text: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading'
    },
    display: {
      variant: 'text.heading',
      fontSize: [5, 6],
      fontWeight: 'display',
      letterSpacing: '-0.03em',
      mt: 3
    },
    caps: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      lineHeight: 'heading',
      textTransform: 'uppercase',
      letterSpacing: '0.1em'
    },
    smScreen: {
      variant: 'text.heading',
      '@media (min-width: 40em)': {
        display: 'none'
      }
    },
    lgScreen: {
      variant: 'text.heading',
      display: 'none',
      '@media (min-width: 40em)': {
        display: 'block'
      }
    }
  },
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      fontWeight: 'bold',
      borderRadius: 8,
      '&:hover': {
        cursor: 'pointer'
      }
    },
    secondary: {
      variant: 'buttons.primary',
      color: 'background',
      bg: 'secondary'
    },
    black: {
      fontWeight: 'bold',
      color: 'background',
      bg: 'text',
      '&:hover, &:focus': {
        bg: 'primary'
      }
    },
    icon: {
      width: 24,
      height: 24,
      p: 0,
      borderRadius: 8,
      '&:hover': {
        cursor: 'pointer',
        bg: 'darken'
      }
    },
    iconSm: {
      variant: 'buttons.icon',
      width: 20,
      height: 20,
      borderRadius: 4,
      color: 'gray'
    }
  },
  links: {
    button: {
      display: 'inline-block',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: 2,
      p: 3,
      color: 'background',
      bg: 'text',
      borderRadius: 8,
      '&:hover, &:focus': {
        color: 'background',
        bg: 'primary'
      }
    },
    nav: {
      display: 'block',
      mr: 2,
      px: 3,
      py: 1,
      color: 'inherit',
      textAlign: 'center',
      textDecoration: 'none',
      fontSize: 1,
      fontWeight: 'bold',
      bg: 'muted',
      transitionProperty: 'background-color',
      transitionTimingFunction: 'ease-out',
      transitionDuration: '.2s',
      borderRadius: 8,
      '&:hover': {
        bg: 'highlight'
      },
      '&.active': {
        color: 'primary',
        bg: 'highlight'
      }
    }
  },
  badges: {
    primary: {
      color: 'background'
    },
    highlight: {
      color: 'text',
      bg: 'highlight'
    },
    accent: {
      color: 'background',
      bg: 'accent'
    },
    outline: {
      color: 'primary',
      bg: 'transparent',
      boxShadow: 'inset 0 0 0 1px'
    },
    circle: {
      height: 16,
      minWidth: 16,
      lineHeight: '16px',
      textAlign: 'center',
      borderRadius: 9999
    }
  },
  images: {
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 8
    }
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 8,
      border: '2px solid',
      borderColor: 'transparent',
      bg: 'muted'
    },
    compact: {
      padding: 1,
      borderRadius: 4,
      border: '1px solid',
      borderColor: 'muted'
    }
  },
  forms: {
    label: {
      fontSize: 1,
      fontWeight: 'bold'
    },
    input: {
      borderColor: 'lightgray',
      borderRadius: 8,
      '&:focus': {
        borderColor: 'primary',
        boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
        outline: 'none'
      }
    },
    select: {
      borderColor: 'lightgray',
      borderRadius: 8,
      '&:focus': {
        borderColor: 'primary',
        boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
        outline: 'none'
      }
    },
    textarea: {
      borderColor: 'lightgray',
      borderRadius: 8,
      '&:focus': {
        borderColor: 'primary',
        boxShadow: t => `0 0 0 2px ${t.colors.primary}`,
        outline: 'none'
      }
    },
    slider: {
      bg: 'muted'
    }
  },
  alerts: {
    primary: {
      color: 'background'
    },
    secondary: {
      color: 'background',
      bg: 'secondary'
    },
    accent: {
      color: 'background',
      bg: 'accent'
    },
    highlight: {
      color: 'text',
      bg: 'highlight'
    }
  },
  messages: {
    success: {
      color: '#257942',
      borderLeftColor: '#48c774',
      bg: '#effaf3'
    },
    danger: {
      color: '#cc0f35',
      borderLeftColor: '#f14668',
      bg: '#feecf0'
    }
  },
  layout: {
    container: {
      p: 3
    }
  },
  styles: {
    root: {
      margin: 0,
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    img: {
      maxWidth: '100%',
      height: 'auto'
    },
    h1: {
      variant: 'text.display'
    },
    h2: {
      variant: 'text.heading',
      fontSize: 5
    },
    h3: {
      variant: 'text.heading',
      fontSize: 4
    },
    h4: {
      variant: 'text.heading',
      fontSize: 3
    },
    h5: {
      variant: 'text.heading',
      fontSize: 2
    },
    h6: {
      variant: 'text.heading',
      fontSize: 1
    },
    a: {
      color: 'primary',
      '&:hover': {
        color: 'secondary'
      }
    },
    pre: {
      fontFamily: 'monospace',
      fontSize: 1,
      p: 3,
      color: 'text',
      bg: 'muted',
      overflow: 'auto',
      code: {
        color: 'inherit'
      },
      variant: 'prism'
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 1
    },
    inlineCode: {
      fontFamily: 'monospace',
      color: 'secondary',
      bg: 'muted'
    },
    table: {
      width: '100%',
      my: 4,
      borderCollapse: 'separate',
      borderSpacing: 0,
      [['th', 'td']]: {
        textAlign: 'left',
        py: '4px',
        pr: '4px',
        pl: 0,
        borderColor: 'muted',
        borderBottomStyle: 'solid'
      }
    },
    th: {
      verticalAlign: 'bottom',
      borderBottomWidth: '2px'
    },
    td: {
      verticalAlign: 'top',
      borderBottomWidth: '1px'
    },
    hr: {
      border: 0,
      borderBottom: '1px solid',
      borderColor: 'muted'
    },
    xray: {
      '*': {
        outline: '1px solid rgba(0, 192, 255, .25)'
      }
    },
    navlink: {
      display: 'inline-block',
      fontWeight: 'bold',
      color: 'inherit',
      textDecoration: 'none',
      ':hover,:focus': {
        color: 'primary'
      }
    }
  }
}
