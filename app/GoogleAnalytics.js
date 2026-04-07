"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = "G-V744NN2W0J";

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [pathname]);

  useEffect(() => {
    function handleClick(event) {
      if (typeof window === "undefined" || typeof window.gtag !== "function") {
        return;
      }

      const target = event.target instanceof Element ? event.target.closest("[data-ga-event]") : null;
      if (!target) {
        return;
      }

      const { gaEvent, gaLabel, gaLocation } = target.dataset;
      const href = target.getAttribute("href");

      window.gtag("event", gaEvent, {
        event_category: "engagement",
        event_label: gaLabel || href || pathname,
        page_path: pathname,
        link_url: href || "",
        section: gaLocation || "",
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
