declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const {
    public: { gaMeasurementId },
  } = useRuntimeConfig();

  if (!gaMeasurementId) {
    return;
  }

  useHead({
    script: [
      {
        key: "ga-gtag-src",
        src: `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`,
        async: true,
      },
    ],
  });

  if (!process.client) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  window.gtag("config", gaMeasurementId, { send_page_view: false });

  nuxtApp.hook("page:finish", () => {
    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search,
      page_title: document.title,
    });
  });
});
