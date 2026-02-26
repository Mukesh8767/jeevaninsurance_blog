import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jivansecure.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/admin/*'], // Prevent Google from attempting to index internal CMS
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
