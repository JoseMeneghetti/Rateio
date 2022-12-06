import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* PWA CONFIGS */}
        <meta name="application-name" content="Rateio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rateio" />
        <meta name="description" content="Digital split do seu role!" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icon-192x192.png" />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />

        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

        <link rel="shortcut icon" href="/favicon.ico" />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Abel&display=swap"
        />

        {/* <!-- HTML Meta Tags --> */}
        <title>Rateio</title>
        <meta
          name="description"
          content="Faça aqui o digital split do seu role! Criei e compartilhe seu rateio."
        />

        {/* <!-- Google / Search Engine Tags --/> */}
        <meta itemProp="name" content="Rateio" />
        <meta
          itemProp="description"
          content="Faça aqui o digital split do seu role! Criei e compartilhe seu rateio."
        />
        <meta itemProp="image" content="/rateio_256.png" />

        {/* <!-- Facebook Meta Tags --/> */}
        <meta property="og:url" content="https://rateio.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Rateio" />
        <meta
          property="og:description"
          content="Faça aqui o digital split do seu role! Criei e compartilhe seu rateio."
        />
        <meta property="og:image" itemProp="image" content="/rateio_256.png" />

        {/* <!-- Twitter Meta Tags --/> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rateio" />
        <meta
          name="twitter:description"
          content="Faça aqui o digital split do seu role! Criei e compartilhe seu rateio."
        />
        <meta name="twitter:image" content="/rateio_256.png" />

        {/* <!-- Twitter Meta Tags --/> */}
        <meta name="whatsapp:card" content="summary_large_image" />
        <meta name="whatsapp:title" content="Rateio" />
        <meta
          name="whatsapp:description"
          content="Faça aqui o digital split do seu role! Criei e compartilhe seu rateio."
        />
        <meta name="whatsapp:image" content="/rateio_256.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
