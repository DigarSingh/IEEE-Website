import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Primary Meta Tags */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#4F46E5" />
          
          {/* SEO Meta Tags */}
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
          <meta name="google" content="notranslate" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="IEEE Club - GEU" />
          <meta property="og:locale" content="en_US" />
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@ieee_geu" />
          
          {/* Preconnect to external domains for performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          
          {/* Favicon */}
          <link rel="icon" href="/images/logo.png" />
          <link rel="apple-touch-icon" href="/images/logo.png" />
          
          {/* Structured Data for Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "IEEE Club - GEU",
                "alternateName": "IEEE Student Branch - Graphic Era University",
                "url": "https://your-domain.com",
                "logo": "https://your-domain.com/images/logo.png",
                "description": "Official IEEE Student Branch at Graphic Era University, fostering innovation and technology leadership among students through workshops, events, and industry connections.",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Dehradun",
                  "addressRegion": "Uttarakhand",
                  "addressCountry": "IN"
                },
                "sameAs": [
                  "https://www.linkedin.com/company/ieee-geu",
                  "https://twitter.com/ieee_geu",
                  "https://www.instagram.com/ieee_geu"
                ]
              })
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
