import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Analytics() {
  const location = useLocation();

  // 1. Aquí pondremos el ID de Google Analytics 4 (GA4)
  // Ejemplo: 'G-XXXXXXXXXX'
  const GA_MEASUREMENT_ID = '';

  // 2. Aquí pondremos el ID del Píxel de Meta (Facebook/Instagram)
  // Ejemplo: '123456789012345'
  const META_PIXEL_ID = '';

  useEffect(() => {
    // --- Google Analytics 4 ---
    if (GA_MEASUREMENT_ID) {
      if (!window.gtag) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, {
          page_path: location.pathname + location.search,
        });
      } else {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: location.pathname + location.search,
        });
      }
    }

    // --- Meta Pixel ---
    if (META_PIXEL_ID) {
      if (!window.fbq) {
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        window.fbq('init', META_PIXEL_ID);
        window.fbq('track', 'PageView');
      } else {
        window.fbq('track', 'PageView');
      }
    }
  }, [location]);

  return null;
}
