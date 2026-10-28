import { avtextWhatsappEn as content } from '@/lib/content/products';
import { productMetadata, productSchemas } from '@/lib/content/productSeo';
import { JsonLd } from '@/components/site/JsonLd';

export const metadata = productMetadata(content);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={productSchemas(content)} />
      {children}
    </>
  );
}
