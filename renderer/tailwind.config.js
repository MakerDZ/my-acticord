import { nextui } from '@nextui-org/react';

module.exports = {
    content: [
        './renderer/pages/**/*.{js,ts,jsx,tsx}',
        './renderer/components/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            keyframes: {
                'bounce-slow': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' }, // Adjust this value for more or less bounce
                },
            },
            animation: {
                'bounce-slow': 'bounce-slow 0.5s ease-in-out', // Adjust duration as needed
            },
            colors: {
                // Dark theme colors
                'dark-dc-primary': '#1E1F22',
                'dark-dc-secondary': '#2A2D31',
                'dark-dc-normal': '#303338',
                'dark-dc-menu': '#111214',
                'dark-dc-menu-text': '#B5BAC0',
                'dark-dc-text': '#F2F3F5',

                // Light theme colors
                'light-dc-pirmary': '#E2E5E8',
                'light-dc-secondary': '#F2F3F5',
                'light-dc-menu-text': '#E2E5E8',

                'dc-blue': '#5764F2',
            },
        },
    },
    darkMode: 'class',
    plugins: [nextui()],
};
