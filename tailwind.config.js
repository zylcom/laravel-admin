import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.vue",
    ],

    theme: {
        extend: {
            colors: {
                "amber-brew": "#dba362",
                "carte-blanche": "#eceaff",
                "cotton-boll": "#e8f1fd",
                "feather-star": "#629ff4",
                "hera-blue": "#817af3",
                "lightish-green": "#58d365",
                "placebo-green": "#ebffed",
                "sand-crystal": "#ffeedb",
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
