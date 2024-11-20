// import the original type declarations
import "i18next";
// import all namespaces (for the default language, only)
import en from "./translation/en/en.json";
import hi from "./translation/hi/hi.json";

declare module "i18next" {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        // custom namespace type, if you changed it
        defaultNS: "en";
        // custom resources type
        resources: {
            en: typeof en;
            hi: typeof hi;
        };
        // other
    }
}
