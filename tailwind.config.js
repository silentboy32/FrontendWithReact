
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'border': 'border 4s linear infinite',
            },
            keyframes: {
                'border': {
                    to: { '--border-angle': '360deg' },
                }
            },

            keyframes: {
                'modal-in': {
                    '0%': { opacity: '0', transform: 'scale(0.9) translateY(8px)' },
                    '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
                },
                'backdrop-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                'modal-in': 'modal-in 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                'backdrop-in': 'backdrop-in 150ms ease-out',
            }
        },
    },
    plugins: [],
}