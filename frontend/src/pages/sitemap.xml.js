const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://geuieee.com';
  
  const pages = [
    '',
    '/about',
    '/events',
    '/gallery',
    '/membership',
    '/contact',
    '/resources',
    '/faq',
    '/privacy',
    '/terms'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    >
      ${pages.map(page => {
        // Set custom priorities and change frequencies based on the page importance
        let priority = '0.8';
        let changefreq = 'weekly';
        
        if (page === '') {
          priority = '1.0';
          changefreq = 'daily';
        } else if (page === '/events' || page === '/gallery') {
          priority = '0.9';
          changefreq = 'daily';
        } else if (page === '/about' || page === '/membership') {
          priority = '0.9';
          changefreq = 'weekly';
        }
        
        return `
        <url>
          <loc>${baseUrl}${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${changefreq}</changefreq>
          <priority>${priority}</priority>
          ${page === '' ? `
          <image:image>
            <image:loc>${baseUrl}/images/logo.png</image:loc>
            <image:title>GEU IEEE Logo</image:title>
            <image:caption>Official IEEE Student Branch at Graphic Era University</image:caption>
          </image:image>` : ''}
        </url>
      `}).join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap; 