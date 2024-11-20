/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./screens/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./navigation/**/*.{js,jsx,ts,tsx}",
        "../seller/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                oldPrimaryGreen: '#2D665F',
                primaryGreen: "#1CB6B6",
                background: "#eef3f7",
                blackBackground: "rgba(0, 0, 0, 0.2)",
                border: "#ACA89E",
                primaryRed: '#FF0000',
                primaryBgGreen: "#A3E8A5",
                primaryLightGreen: '#1aa828',
                primaryBlue: "#5180F7",
                primaryLightBlue: "#B2DAFF",
                primarLightOrange: "#FFCEB2",
                primaryLightPurple: "#C8BFFF",
                primaryPurple: "#4D4CA4",
                secondaryBlue: "#4073F7",
                secondaryPurple: '#424199',
                secondaryLightPurple: "#5E5F8C",
                secondaryGreen: "#1aa828",
                secondaryLightBlue: "#389BFF",
                secondaryYellow: "#FF9C38"
            },

            backgroundColor: {
                oldPrimaryGreen: '#2D665F',
                primaryGreen: "#1CB6B6",
                background: "#eef3f7",
                blackBackground: "rgba(0, 0, 0, 0.2)",
                border: "#ACA89E",
                primaryRed: '#FF0000',
                primaryBgGreen: "#A3E8A5",
                primaryLightGreen: '#1aa828',
                primaryBlue: "#5180F7",
                primaryLightBlue: "#B2DAFF",
                primarLightOrange: "#FFCEB2",
                primaryLightPurple: "#C8BFFF",
                primaryPurple: "#4D4CA4",
                secondaryBlue: "#4073F7",
                secondaryPurple: '#424199',
                secondaryLightPurple: "#5E5F8C",
                secondaryGreen: "#1aa828",
                secondaryLightBlue: "#389BFF",
                secondaryYellow: "#FF9C38"
            },
            fontFamily: {
                Poppins: ['Poppins', 'sans'],
                PoppinsLight: ['Poppins-Light', 'sans'],
                PoppinsMedium: ['Poppins-Medium', 'sans'],
                PoppinsSemiBold: ['Poppins-SemiBold', 'sans'],
                PoppinsBold: ['Poppins-Bold', 'sans'],
                PoppinsBlack: ['Poppins-Black', 'sans'],
            }
        },
    },
    plugins: [],
};
