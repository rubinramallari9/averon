import { ProductPage } from '@/components/site/ProductPage';
import { avtextWhatsappEn as content } from '@/lib/content/products';

export default function Page() {
  return <ProductPage content={content} />;
}
