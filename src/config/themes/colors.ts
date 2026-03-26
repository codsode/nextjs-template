export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  primaryHover: string;
  primaryLight: string;
  secondary: string;
  secondaryForeground: string;
  secondaryHover: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  destructiveHover: string;
  border: string;
  input: string;
  inputHover: string;
  ring: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
}

export interface ThemePalette {
  light: ThemeColors;
  dark: ThemeColors;
}

export const blueTheme: ThemePalette = {
  light: {
    background: '248 250 252', // slate-50
    foreground: '15 23 42', // slate-900
    card: '255 255 255',
    cardForeground: '15 23 42',
    primary: '37 99 235', // blue-600
    primaryForeground: '255 255 255',
    primaryHover: '29 78 216', // blue-700
    primaryLight: '219 234 254', // blue-100
    secondary: '241 245 249', // slate-100
    secondaryForeground: '15 23 42',
    secondaryHover: '226 232 240', // slate-200
    muted: '241 245 249',
    mutedForeground: '100 116 139', // slate-500
    accent: '241 245 249',
    accentForeground: '15 23 42',
    destructive: '220 38 38', // red-600
    destructiveForeground: '255 255 255',
    destructiveHover: '185 28 28', // red-700
    border: '226 232 240', // slate-200
    input: '203 213 225', // slate-300
    inputHover: '148 163 184', // slate-400
    ring: '37 99 235', // blue-600
    success: '22 163 74', // green-600
    successForeground: '255 255 255',
    warning: '234 179 8', // yellow-500
    warningForeground: '255 255 255',
  },
  dark: {
    background: '2 6 23', // slate-950
    foreground: '226 232 240', // slate-200
    card: '15 23 42', // slate-900
    cardForeground: '226 232 240',
    primary: '59 130 246', // blue-500
    primaryForeground: '255 255 255',
    primaryHover: '96 165 250', // blue-400
    primaryLight: '30 58 138', // blue-900
    secondary: '30 41 59', // slate-800
    secondaryForeground: '226 232 240',
    secondaryHover: '51 65 85', // slate-700
    muted: '30 41 59',
    mutedForeground: '148 163 184', // slate-400
    accent: '30 41 59',
    accentForeground: '226 232 240',
    destructive: '239 68 68', // red-500
    destructiveForeground: '255 255 255',
    destructiveHover: '248 113 113', // red-400
    border: '30 41 59', // slate-800
    input: '51 65 85', // slate-700
    inputHover: '71 85 105', // slate-600
    ring: '59 130 246',
    success: '34 197 94', // green-500
    successForeground: '255 255 255',
    warning: '250 204 21', // yellow-400
    warningForeground: '0 0 0',
  },
};

export const greenTheme: ThemePalette = {
  light: {
    ...blueTheme.light,
    primary: '22 163 74', // green-600
    primaryHover: '21 128 61', // green-700
    primaryLight: '220 252 231', // green-100
    ring: '22 163 74',
  },
  dark: {
    ...blueTheme.dark,
    primary: '34 197 94', // green-500
    primaryHover: '74 222 128', // green-400
    primaryLight: '20 83 45', // green-900
    ring: '34 197 94',
  },
};

export const purpleTheme: ThemePalette = {
  light: {
    ...blueTheme.light,
    primary: '124 58 237', // violet-600
    primaryHover: '109 40 217', // violet-700
    primaryLight: '237 233 254', // violet-100
    ring: '124 58 237',
  },
  dark: {
    ...blueTheme.dark,
    primary: '139 92 246', // violet-500
    primaryHover: '167 139 250', // violet-400
    primaryLight: '76 29 149', // violet-900
    ring: '139 92 246',
  },
};

export const themes = {
  blue: blueTheme,
  green: greenTheme,
  purple: purpleTheme,
} as const;

export type ThemeName = keyof typeof themes;
export type ThemeMode = 'light' | 'dark' | 'system';
