import { ACTIVE_THEME } from '@env';
const colors = {
  primary: {
    primary: '#FFFFFF',
    secondary: {
      orange: '#ffe5b4',
      blue: '#cbdfe5',
      red: '#fff5f5',
      strongRed: '#ff3d39'
    },
    accent: '#ffa806',
    font: {
      primary: '#4d4d4d',
      secondary: '#ae6537'
    }
  },
  secondary: {
    primary: '#5b3c19',
    secondary: '#f2ede6',
    accent: '#738713',
    font: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF'
    }
  }
}
const activeColorScheme = 'primary';
const colorScheme = colors[activeColorScheme];

export default colorScheme;