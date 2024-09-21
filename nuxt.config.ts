// https://nuxt.com/docs/api/configuration/nuxt-config
import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';


const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{red.50}',
      100: '{red.100}',
      200: '{red.200}',
      300: '{red.300}',
      400: '{red.400}',
      500: '{red.500}',
      600: '{red.600}',
      700: '{red.700}',
      800: '{red.800}',
      900: '{red.900}',
      950: '{red.950}'
    }
  }
});

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/main.scss'],
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxt/eslint', '@primevue/nuxt-module'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  primevue: {
    options: {
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: 'class',
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      storageUrl: process.env.STORAGE_URL,
    }
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'zh-TW',
    locales: [
      { code: 'en', name: 'English' },
      { code: 'zh-TW', name: '正體中文' },
    ]
  },
  
})