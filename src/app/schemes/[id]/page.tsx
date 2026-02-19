import { schemes } from '@/lib/mock-data';
import SchemeDetailClient from './SchemeDetailClient';

export function generateStaticParams() {
  return schemes.map((scheme) => ({
    id: scheme.id,
  }));
}

export default function SchemeDetailPage({ params }: { params: { id: string } }) {
  return <SchemeDetailClient id={params.id} />;
}
