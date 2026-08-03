import { MetadataRoute } from 'next';

const BASE_URL = 'https://karwareyehospital.in';

// All routes that should be included in the sitemap
const routes = [
  '',
  '/about',
  '/services',
  '/doctors',
  '/appointments',
  '/contact',
  '/gallery',
  '/empanelments',
  '/privacy-policy',
  '/terms-of-use',
];

// Locales supported
const locales = ['en', 'kn'];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  // Add root redirect
  sitemap.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  });

  // Generate sitemap entries for each route × locale combination
  locales.forEach((locale) => {
    routes.forEach((route) => {
      const url = `${BASE_URL}/${locale}${route}`;
      
      // Determine priority based on route
      let priority = 0.8;
      let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly';
      
      if (route === '') {
        // Home page
        priority = 1;
        changeFrequency = 'daily';
      } else if (route === '/doctors' || route === '/appointments' || route === '/contact') {
        // High-priority pages
        priority = 0.9;
        changeFrequency = 'weekly';
      } else if (route === '/services' || route === '/about') {
        // Important static pages
        priority = 0.8;
        changeFrequency = 'monthly';
      } else if (route === '/gallery' || route === '/empanelments') {
        // Dynamic content pages
        priority = 0.7;
        changeFrequency = 'monthly';
      } else {
        // Legal/policy pages
        priority = 0.5;
        changeFrequency = 'yearly';
      }

      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${route}`,
            kn: `${BASE_URL}/kn${route}`,
          },
        },
      });
    });
  });

  return sitemap;
}
