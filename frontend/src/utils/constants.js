const THEME_SHARED_VALUES = {
  primary: 'blue',
  secondary: 'hsl(23deg 67% 63%)',
  danger: 'red'
}

export const THEMES = {
  light: {
    backgroundGradient: `linear-gradient(
      165deg,
      hsl(0deg 46% 48%) 0%,
      hsl(5deg 51% 52%) 8%,
      hsl(9deg 54% 56%) 15%,
      hsl(14deg 59% 60%) 23%,
      hsl(19deg 63% 64%) 31%,
      hsl(23deg 67% 68%) 38%,
      hsl(28deg 71% 72%) 46%,
      hsl(32deg 76% 76%) 54%,
      hsl(37deg 79% 79%) 62%,
      hsl(41deg 84% 83%) 69%,
      hsl(46deg 88% 87%) 77%,
      hsl(51deg 91% 91%) 85%,
      hsl(57deg 92% 95%) 92%,
      hsl(60deg 100% 99%) 100%
    )`,
    backgroundColor: 'white',
    backgroundTransparentPrimary: 'hsla(23deg,67%, 68%, 30%)',
    backgroundTransparentSecondary: 'hsla(23deg,67%, 68%, 3%)',
    colorTransparent: 'hsla(100deg, 100%, 100%, 0.2)',

    textColorMain: 'hsl(211, 57%, 14%)',
    ...THEME_SHARED_VALUES
    
  },
  dark: {
    backgroundGradient: `linear-gradient(
      165deg,
      hsl(0deg 0% 0%) 0%,
      hsl(60deg 100% 99%) 100%
    )`,
    backgroundColor: 'black',
    backgroundTransparent: 'hsla(100deg, 0%, 0%, 0.2)',
    backgroundTransparentSecondary: 'hsla(0deg, 46%, 48%, 0.5)',
    colorTransparent: 'hsla(100deg, 100%, 100%, 0.2)',

    textColorMain: 'white',
    ...THEME_SHARED_VALUES
    
  }
}