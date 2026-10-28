import { ReceptionistLanding } from '@/components/site/ReceptionistLanding';
import { receptionistSq as content } from '@/lib/content/receptionist';

export default function Page() {
  return <ReceptionistLanding content={content} />;
}
