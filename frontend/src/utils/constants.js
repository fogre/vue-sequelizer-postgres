const THEME_SHARED_VALUES = {
  primary: 'blue',
  secondary: 'hsl(15deg 67% 63%)',
  danger: 'red',
  success: 'green'
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

    primary: 'hsl(218, 100%, 33%)',
    secondary: 'hsl(15deg 67% 63%)',
    
  },
  dark: {
    backgroundGradient: `linear-gradient(
      145deg,
      hsl(240deg 100% 7%) 0%,
      hsl(232deg 85% 10%) 5%,
      hsl(225deg 69% 14%) 13%,
      hsl(219deg 53% 18%) 26%,
      hsl(212deg 37% 21%) 47%,
      hsl(203deg 21% 25%) 80%,
      hsl(197deg 5% 35%) 100%
    )`,
    backgroundColor: 'hsl(213, 39%, 18%)',
    backgroundTransparentPrimary: 'hsla(280, 50%, 80%, 40%)',
    backgroundTransparentSecondary: 'hsla(280, 50%, 70%, 10%)',
    colorTransparent: 'hsla(290, 50%, 70%, 20%)',

    textColorMain: 'white',
    primary: 'hsl(213, 70%, 70%)',
    secondary: 'hsl(23deg 17% 58%)'
    
  }
}