import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';

import '../styles/globals.css';
import useThemeStore from '../store/theme.store';
import Navigation from '../components/Navigation/Navigation';
import { QueryProviders } from '../provider/queryClient';

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
            <NextUIProvider>
                <QueryProviders>
                    <body className="w-full h-screen dark:bg-dark-dc-secondary  bg-light-dc-secondary flex flex-col">
                        <Navigation />
                        <main className="flex-1">
                            <Component {...pageProps} />
                        </main>
                    </body>
                </QueryProviders>
            </NextUIProvider>
        </html>
    );
}

export default MyApp;
