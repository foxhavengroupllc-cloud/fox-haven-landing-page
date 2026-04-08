import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AI_SERVICES, getServiceBySlug, getRelatedServices } from '@/lib/ai-solutions-config';
import ServiceDetailContent from '@/components/ai-solutions/ServiceDetailContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AI_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | AI Solutions — Fox Haven Group`,
    description: service.tagline,
    openGraph: {
      title: `${service.title} — Fox Haven Group AI Solutions`,
      description: service.tagline,
      url: `https://foxhavengrouphq.com/ai-solutions/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(slug, 3);

  return <ServiceDetailContent service={service} related={related} />;
}
