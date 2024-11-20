// i18n.js

import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3', // to support translate v3 json format
    resources: {
        en: {
            translation: require("./en/en.json"),
        },
        hi: {
            translation: require("./hi/hi.json"),
        },
        ur: {
            translation: require("./ur/ur.json"),
        },
        pu: {
            translation: require("./pu/pu.json"),
        },
    },
    fallbackLng: "en",
    // debug: true,
    interpolation: {
        escapeValue: false,
    },
});

export default i18next;
