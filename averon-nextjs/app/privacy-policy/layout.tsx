import type { Metadata } from 'next';
import { baseUrl, generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy | Averon Agency',
  description: 'How Averon Agency collects, uses, and protects information from visitors and Instagram/WhatsApp messaging users.',
  alternates: {
    canonical: `${baseUrl}/privacy-policy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: baseUrl },
  { name: 'Privacy Policy', url: `${baseUrl}/privacy-policy` },
]);

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
