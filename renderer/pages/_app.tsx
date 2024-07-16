import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';

import '../styles/globals.css';
import useThemeStore from '../store/theme.store';
import Navigation from '../components/Navigation/Navigation';

function MyApp({ Component, pageProps }: AppProps) {
    const [themeLoaded, setThemeLoaded] = useState(false);
    const { theme, setTheme } = useThemeStore();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme-storage');
        if (savedTheme) {
            const parsedTheme = JSON.parse(savedTheme);
            setTheme(parsedTheme.state.theme);
        }
        setThemeLoaded(true);
    }, [setTheme]);

    if (!themeLoaded) {
        return null;
    }

    return (
        <html lang="en" className={theme}>
            <body>
                <Navigation />
                <NextUIProvider>
                    <main className="dark:bg-dark-dc-secondary w-full h-screen bg-light-dc-secondary">
                        <Component {...pageProps} />
                    </main>
                </NextUIProvider>
            </body>
        </html>
    );
}

export default MyApp;
