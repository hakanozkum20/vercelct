import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/features',
          '/pricing',
          '/testimonials',
          '/mobile-app',
          '/exam-tracker',
          '/blog',
          '/blog/*',
          '/help',
          '/help/faq',
          '/help/contact',
        ],
        disallow: [
          '/api/*',
          '/admin/*',
          '/dashboard/*',
          '/settings/*',
          '/profile/*',
          '/auth/*',
          '/_next/*',
          '/static/*',
          '/*.json$',
          '/*.xml$',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/*',
          '/admin/*',
          '/dashboard/*',
          '/settings/*',
          '/profile/*',
          '/auth/*',
        ],
        crawlDelay: 1,
      }
    ],
    sitemap: 'https://coachtale.com/sitemap.xml',
    host: 'https://coachtale.com',
  }
} 