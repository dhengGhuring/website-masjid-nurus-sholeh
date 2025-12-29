import { heroui } from "@heroui/react";

export default heroui({
    themes: {
        light: {
            colors: {
                background: "#F9FBFA",
                foreground: "#1B2E25",
                primary: {
                    DEFAULT: "#4A9C6D",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#EEF5F1",
                    foreground: "#1B2E25",
                },
                success: {
                    DEFAULT: "#2E9E5F", // Income
                    foreground: "#FFFFFF",
                },
                danger: {
                    DEFAULT: "#E53935", // Destructive
                    foreground: "#FFFFFF",
                },
                // Mapping Expense to a custom semantic if possible, or just using danger
            },
        },
    },
});
