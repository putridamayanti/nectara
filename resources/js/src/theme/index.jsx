import {createTheme} from "@mui/material";
import typography from "./typography.jsx";
import {darkShadows, shadows} from "./shadows.jsx";
import {DarkThemeColors, LightThemeColors} from "./colors.jsx";
import components from "./components.jsx";

const BuildTheme = (mode) => {
    const palette = mode === 'dark' ? DarkThemeColors : LightThemeColors;
    const shadow = mode === 'dark' ? darkShadows : shadows;

    const theme = createTheme({
        palette: {
            mode: mode,
            ...palette
        },
        shadows: shadow,
        typography: { ...typography },
    });

    theme.components = components(theme);

    return theme;
};

export default BuildTheme;
