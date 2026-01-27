import LoadingScreen from '@/components/LoadingScreen';

/**
 * Next.js App Router loading state
 * Automatically displayed during:
 * - Page navigation
 * - Route changes
 * - Suspense boundaries
 */
export default function Loading() {
  return <LoadingScreen showLogo={true} minDisplayTime={400} />;
}
