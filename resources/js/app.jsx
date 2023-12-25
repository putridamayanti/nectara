import './bootstrap';
import '../css/app.css';
import './styles.css';

import React from "react";
import {createInertiaApp} from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";

import AuthLayout from "./src/layouts/AuthLayout.jsx";
import AppLayout from "./src/layouts/AppLayout.jsx";
import BuildTheme from "./src/theme/index.jsx";
import store from "./src/store/index.jsx";
import {ThemeProvider} from "@mui/material";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.jsx', { eager: true })
        let page = pages[`./pages/${name}.jsx`];
        let Layout = AuthLayout;

        if (name.startsWith('app')) {
            Layout = AppLayout;
        }

        page.default.layout = page => <Layout children={page} />;

        return resolvePageComponent(`./pages/${name}.jsx`, pages)
    },
    setup({el, App, props}) {
        const root = createRoot(el)
        return root.render(
            <ThemeProvider theme={BuildTheme('light')}>
                <Provider store={store}>
                    <App {...props} />
                </Provider>
            </ThemeProvider>
        );
    }
});

InertiaProgress.init({ color: "#414042" });
