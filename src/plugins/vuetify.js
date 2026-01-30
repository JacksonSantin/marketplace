/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import { pt } from "vuetify/locale";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: "pt",
    fallback: "pt",
    messages: { pt },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#FFFFFF",
          secondary: "#f24e29",
          accent: "#f24e29",
          error: "#f24e29",
          info: "#1f3b53",
          success: "#4CAF50",
          warning: "#FFC107",
          black: "#000000",
        },
      },
    },
  },
  defaults: {},
});
