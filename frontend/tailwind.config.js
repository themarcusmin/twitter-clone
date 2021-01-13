module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'twitterBlue': '#15202A',
                'twitterLightBlue': '#253341',
                'twitterTextBlue': '#1B95E0',
                'twitterBtn': '#35a2f0',
                'twitterBtnHover': '#257cba'
            },
            wordBreak: ['hover', 'focus'],
            stroke: ['hover', 'focus'],
            boxShadow: {
                white: '0 0 20px -5px rgba(255, 255, 255, 0.3)'
            }
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
            textColor: ['group-hover', 'group-focus']
        },
    },
    plugins: [require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),],
}