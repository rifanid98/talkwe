import { ACTIVE_THEME } from '@env';
const colors = {
  primary: {
    primary: '#FFFFFF',
    secondary: '#e6e6e6',
    accent: '#413f57',
    font: {
      primary: '#4d4d4d',
      secondary: '#808080'
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