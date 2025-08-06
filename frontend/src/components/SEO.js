import Head from 'next/head';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  structuredData = null 
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://geuieee.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image ? `${baseUrl}${image}` : `${baseUrl}/images/hero/IEEE_hero.jpg`;
  
  // Default structured data for GEU IEEE organization if none is provided
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GEU IEEE Student Branch",
    "alternateName": "IEEE Club - Graphic Era University",
    "url": baseUrl,
    "logo": `${baseUrl}/images/logo.png`,
    "sameAs": [
      "https://www.facebook.com/ieeegeu",
      "https://www.instagram.com/ieee_geu",
      "https://www.linkedin.com/company/ieee-geu",
      "https://twitter.com/ieee_geu"
    ],
    "location": {
      "@type": "Place",
      "name": "Graphic Era University",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dehradun",
        "addressRegion": "Uttarakhand",
        "postalCode": "248002",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "30.3165",
        "longitude": "78.0322"
      }
    }
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="IEEE Club - Graphic Era University" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="GEU IEEE - Graphic Era University IEEE Student Branch" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ieee_geu" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="geo.region" content="IN-UT" />
      <meta name="geo.placename" content="Dehradun" />
      <meta name="geo.position" content="30.3165;78.0322" />
      <meta name="ICBM" content="30.3165, 78.0322" />
      
      {/* GEU IEEE specific tags */}
      <meta name="google-site-verification" content="your-verification-code" />
      <meta name="robots" content="index, follow" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData || defaultStructuredData)
        }}
      />
    </Head>
  );
};

export default SEO; 