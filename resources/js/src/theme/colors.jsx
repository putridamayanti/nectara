const BasicThemeColors = {
    primary: {
        main: '#5A81FA',
        light: '#F3F6FF',
        dark: '#3F5CB3',
        contrastText: '#FFFFFF'
    },
    secondary: {
        main: '#2C3D8F',
        light: '#EDEFFA',
        dark: '#202B65',
        contrastText: '#FFFFFF'
    },
};

const LightThemeColors = {
    ...BasicThemeColors,
    success: {
        main: '#39CC98',
        light: '#e3fdf7',
        dark: '#0B7E69',
        contrastText: '#FFFFFF'
    },
    info: {
        main: '#669CFF',
        light: '#E0EBFF',
        dark: '#5283DC',
        contrastText: '#FFFFFF'
    },
    pink: {
        main: '#FF808C',
        light: '#FFE8E9',
        dark: '#DC5B67',
        contrastText: '#FFFFFF'
    },
    warning: {
        main: '#FEB061',
        light: '#FFF4E9',
        dark: '#E3913E',
        contrastText: '#FFFFFF'
    },
    grey: {
        main: '#41424E',
        contrastText: '#FFFFFF',
        100: '#F1F1F3',
        200: '#D4D5DB',
        300: '#8D8EA0',
        400: '#656679',
        500: '#41424E',
        600: '#383943',
        700: '#21222D'
    },
    text: {
        main: '#474747',
        secondary: '#7C7C7C'
    },
    background: {
        default: '#FDFDFD',
        dark: '#f8f9fa',
        paper: '#FFFFFF',
    },
};

const DarkThemeColors = {
    ...BasicThemeColors,
    primary: {
        ...BasicThemeColors.primary,
        light: '#4E2C38'
    },
    secondary: {
        ...BasicThemeColors.secondary,
        light: '#504332'
    },
    text: {
        main: '#FFFFFF',
        primary: '#EAEFF4',
        secondary: '#7C8FAC',
    },
    action: {
        disabledBackground: 'rgba(73,82,88,0.12)',
        hoverOpacity: 0.02,
        hover: '#333F55',
    },
    divider: '#333F55',
    success: {
        main: '#13DEB9',
        light: '#1B3C48',
        dark: '#0B7E69',
        contrastText: '#FFFFFF'
    },
    grey: {
        main: '#41424E',
        contrastText: '#FFFFFF',
        700: '#F1F1F3',
        600: '#D4D5DB',
        500: '#8D8EA0',
        400: '#656679',
        300: '#41424E',
        200: '#383943',
        100: '#21222D'
    },
    background: {
        paper: '#21222D',
        dark: '#171821',
        default: '#171821',
    },
};

export { LightThemeColors, DarkThemeColors };
