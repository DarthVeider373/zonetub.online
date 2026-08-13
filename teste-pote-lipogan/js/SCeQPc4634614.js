
      (function() {
        try {
          const atomiStaticPageMeta = {"pageId":"Ie2FPelN9uRhztG77jrn","pageName":"Teste - LIPOGAN WP ELEMENTOR","pageDomain":null};
          const ATOMI_PLATFORM_NOTIFY_URL = "https://apido.atomicat-api.com/platform/notify/s/fe";

          function atomiSerializeError(error) {
            try {
              if (!error) return { message: "Unknown error" };
              if (typeof error === "string") return { message: error };
              if (error instanceof Error) {
                return {
                  name: error.name,
                  message: error.message,
                  stack: error.stack,
                };
              }
              return {
                message: error?.message || "Non-Error exception",
                raw: JSON.stringify(error),
              };
            } catch (serializationError) {
              return {
                message: "Failed to serialize error",
                serializationError: serializationError?.message,
              };
            }
          }

          function atomiReportError(error, extra = {}) {
            try {
              const payload = {
                domain: window?.location?.hostname || atomiStaticPageMeta?.pageDomain || "",
                pageUrl: window?.location?.href || "",
                pagePath: window?.location?.pathname || "",
                referrer: document?.referrer || "",
                userAgent: navigator?.userAgent || "",
                language: navigator?.language || "",
                viewport: {
                  width: window?.innerWidth,
                  height: window?.innerHeight,
                },
                timestamp: new Date().toISOString(),
                pageMeta: atomiStaticPageMeta,
                error: atomiSerializeError(error),
                extra,
              };

              const payloadString = JSON.stringify(payload);
              if (navigator?.sendBeacon) {
                const blob = new Blob([payloadString], { type: "text/plain;charset=UTF-8" });
                navigator.sendBeacon(ATOMI_PLATFORM_NOTIFY_URL, blob);
                return;
              }

              fetch(ATOMI_PLATFORM_NOTIFY_URL, {
                method: "POST",
                mode: "no-cors",
                keepalive: true,
                headers: {
                  "Content-Type": "text/plain;charset=UTF-8",
                },
                body: payloadString,
              }).catch(() => {});
            } catch (reportingError) {
              console.log(reportingError);
            }
          }

          if (typeof window !== "undefined") {
            window.atomiReportError = atomiReportError;
          }
        } catch (error) {
          console.log(error);
        }
      })();
    
      function runDelayedFunctions(data) {
        try {
          document.querySelectorAll('.atomicat-delay').forEach(el => el.classList.remove('atomicat-delay'));
          if(data?.setDisplayed){
            localStorage.setItem(data?.setDisplayed, true);
          }
          
        } catch (error) {
          console.log(error);
        }
      }
    
      function atomiGetVturbSrc() {
        try {
          var src = "";

          try {
            var pageUrl = new URL(window.location.href);
            src = pageUrl.searchParams.get("src") || "";
            if (src) return location.search != "" ? "&src=" + src : "?src=" + src;
          } catch (e) {}

          try {
            var links = document.querySelectorAll('a[href*="src="]');
            for (var i = 0; i < links.length; i++) {
              try {
                var u = new URL(links[i].href);
                var s = u.searchParams.get("src");
                if (s) return location.search != "" ? "&src=" + s : "?src=" + s;
              } catch (e2) {
                console.log(e2);
              }
            }
          } catch (e1) {}

          return "";
        } catch (error) {
          console.log(error);
        }
      }
    