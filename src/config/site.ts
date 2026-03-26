interface SiteConfig {
  readonly name: string;
  readonly description: string;
  readonly url: string;
}

export const siteConfig: SiteConfig = {
  name: 'Next.js Template',
  description:
    'A production-grade Next.js template with authentication, state management, and best practices.',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
};
