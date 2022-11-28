/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            // backgroundImage:{
            // "progressConic":"conic"
            //}
            boxShadow: {
                shadowCircle:
                    "-50px -50px 150px rgba(158, 158, 158, 0.2), 50px -10px 100px rgba(0,0,0,0.5)",
            },
        },
    },
    plugins: [],
};
