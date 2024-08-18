// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Лучший магазин БУ запчастей для автомобилей - Высокое качество и доступные цены',
            meta: [
                {
                    name: 'Магазин БУ автозапчастей, купить БУ запчасти, качественные автозапчасти, дешевые автозапчасти, авторазборка',
                    content: 'Ищете надежные БУ запчасти для вашего автомобиля? Наш магазин предлагает широкий ассортимент качественных автозапчастей по доступным ценам. Гарантия качества, быстрая доставка и консультации экспертов.'
                }
            ],
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/egjs-flicking/4.3.0/flicking.css',
                    crossorigin: 'anonymous'
                },
                {
                    rel: 'stylesheet',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/egjs-flicking/4.3.0/flicking-inline.css',
                    crossorigin: 'anonymous'
                },
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
                {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
                {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
                {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
                {rel: 'manifest', href: '/site.webmanifest'},
            ],
        },
    },
    compatibilityDate: '2024-07-11',
    modules: ['@pinia/nuxt', "nuxtjs-naive-ui"],
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})