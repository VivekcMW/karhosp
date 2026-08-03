import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
          '/*.json$',
          '/sample-logos/', // Exclude sample logos page
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/sample-logos/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: [
          '/sample-logos/',
        ],
      },
    ],
    sitemap: 'https://karwareyehospital.in/sitemap.xml',
    host: 'https://karwareyehospital.in',
  };
}
