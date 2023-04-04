import { Html, Head, Main, NextScript } from "next/document";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <div className="flex justify-center items-center w-full">
          <Link href={"/"}>
            <Image
              src={"/Rateio.png"}
              width={350}
              height={350}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              alt="Logo"
            />
          </Link>
        </div>
      </Head>
      <body className="bg-rateio">
        <Main />
        <NextScript />
      </body>
      <Footer/>
    </Html>
  );
}
