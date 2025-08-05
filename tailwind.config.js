/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: {
                'DEFAULT': '1rem',
                'sm': '1.5rem',
                'lg': '5rem',
                'xl': '9rem',
                '2xl': '12rem',
            },
        },
        extend: {
            colors: {
                border: 'var(--border)',
                input: 'var(--input)',
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: 'var(--primary)',
                primaryHover: 'var(--primaryHover)',
                muted: {
                    DEFAULT: 'var(--muted)',
                    hard: 'var(--muted-hard)',
                },
                accent: 'var(--accent)',
                accentAlt: 'var(--accentAlt)',
                highlight: 'var(--highlight)',
                paragraph: {
                    DEFAULT: 'var(--paragraph)',
                    hover: 'var(--paragraph-hover)',
                },
                button: 'var(--button)',
                buttonHover: 'var(--buttonHover)',
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                },
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
                cardAlt: {
                    DEFAULT: 'var(--cardAlt)',
                    hover: 'var(--cardAlt-hover)',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                animatedgradient: {
                    to: {
                        backgroundPosition: '200% center',
                    },
                },
                wave: {
                    '0%': { transform: 'rotate(0.0deg)' },
                    '10%': { transform: 'rotate(0deg)' },
                    '20%': { transform: 'rotate(0deg)' },
                    '30%': { transform: 'rotate(0deg)' },
                    '40%': { transform: 'rotate(14.0deg)' },
                    '50%': { transform: 'rotate(-7.0deg)' },
                    '60%': { transform: 'rotate(12.0deg)' },
                    '70%': { transform: 'rotate(-3.0deg)' },
                    '80%': { transform: 'rotate(9.0deg)' },
                    '90%': { transform: 'rotate(0.0deg)' },
                    '100%': { transform: 'rotate(0.0deg)' },
                },
            },
            animation: {
                'blob': 'blob 5s infinite',
                'text-gradient': 'animatedgradient 1.5s linear infinite reverse',
                'wave': 'wave 1.5s normal',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
